import db from "../firebaseConfig";
import { Request, Response } from "express";
import { GeneratedCode } from "../models/ValidationCode";
import { DocumentData } from "@google-cloud/firestore";

const generateRandomDigits = (): string => {
  let result = "";
  const length = 8;
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // Generate random digit from 0 to 9
  }
  return result;
};

const generateAndStoreCode = async (email: string): Promise<GeneratedCode> => {
  const code = generateRandomDigits();
  const timestamp = Date.now();
  const codeRef = await db
    .collection("generatedCodes")
    .add({ code, timestamp, email });
  const generatedCode: GeneratedCode = {
    id: codeRef.id,
    code,
    timestamp,
    email,
  };
  return generatedCode;
};

const sendValidationCodeEmail = async (
  email: string,
  code: string,
  timestamp: number
): Promise<void> => {
  // Code to send an email with the validation code
  // This could involve using Node.js nodemailer or an email service API
  console.log(
    `Email sent to ${email} with code ${code} generated at ${new Date(
      timestamp
    )}`
  );
};

const retrieveValidationCode = async (
  email: string
): Promise<GeneratedCode> => {
  const generatedCodesSnapshot = await db
    .collection("generatedCodes")
    .where("email", "==", email)
    .limit(1)
    .get();
  const generatedCode: GeneratedCode = generatedCodesSnapshot.docs.map(
    (doc: DocumentData) => ({
      id: doc.id,
      ...(doc.data() as GeneratedCode),
    })
  )[0];
  return generatedCode;
};

export const validateUserEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { emailTo } = req.body;
    if (!!emailTo) {
      const { code, timestamp } = await generateAndStoreCode(emailTo);
      await sendValidationCodeEmail(emailTo, code, timestamp);
      res.status(200).json({
        message: "Validation email sent successfully",
        code,
        timestamp,
      });
    } else {
      res.status(400).json({ message: "Provide an email address" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const isCodeExpired = (timestamp: number): boolean => {
  if (Date.now() - timestamp > 900000) {
    return true;
  }
  return false;
};

const removeCodeFromDB = async (code: GeneratedCode): Promise<void> => {
  await db.collection("generatedCodes").doc(code.id).delete();
};

export const validateCodeFromUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, code } = req.body;
    if (!!email) {
      const storedCode: GeneratedCode = await retrieveValidationCode(email);
      if (
        storedCode &&
        storedCode.code === code &&
        !isCodeExpired(storedCode.timestamp)
      ) {
        console.log("Verified removing form DB");
        await removeCodeFromDB(storedCode);
        res.status(200).json({ validated: true });
      } else {
        res
          .status(400)
          .json({ message: "Validation failed. Invalid or expired code." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
