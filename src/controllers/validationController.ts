import db from "../firebaseConfig";
import { Request, Response } from "express";
import { GeneratedCode } from "../models/ValidationCode";
import { DocumentData } from "@google-cloud/firestore";
import nodemailer from "nodemailer";
import he from "he";
import crypto from "crypto";

const generateRandomDigits = (length: number): string => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const code = randomBytes.toString("hex").slice(0, length);
  return code;
};

const generateAndStoreCode = async (email: string): Promise<GeneratedCode> => {
  const code = generateRandomDigits(8);
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
  fullName: string,
  code: string,
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "masinventorymaster@gmail.com", // Your Gmail address
      pass: "dbcfyurfzwmpprld", // Your Gmail password or App Password if using 2FA
    },
  });
  const escapedFullName = he.encode(fullName);
  const escapedCode = he.encode(code);
  const mailOptions = {
    from: "masinventorymaster@gmail.com",
    to: email,
    subject: "Validate your email",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Email Validation</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
            }
            .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h2 {
            font-size: 20px;
            color: #007bff;
            }
            p {
            margin-bottom: 15px;
            }
            .code {
            font-size: 16px;
            }
        </style>
      </head>
      <body>
        <div class="container">
            <h2>Hi ${escapedFullName}!</h2>
            <p>Please enter the following code to validate your email:</p>
            <p class="code">${escapedCode}</p>
            <p>Thank you</p>
        </div>
      </body>
      </html>
    `,
  };
  const info = await transporter.sendMail(mailOptions);
  if (info.accepted.length > 0) {
    return true;
  }
  return false;
};

const retrieveValidationCode = async (
  email: string,
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
    }),
  )[0];
  return generatedCode;
};

export const validateUserEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { emailTo, fullName } = req.body;
    if (!!emailTo && !!fullName) {
      const { code } = await generateAndStoreCode(emailTo);
      const sent = await sendValidationCodeEmail(emailTo, fullName, code);
      res.status(200).json({
        sentEmail: sent,
      });
    } else {
      res.status(400).json({ message: "Provide an email address" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const isCodeExpired = (timestamp: number): boolean => {
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
  res: Response,
): Promise<void> => {
  try {
    const { email, code } = req.body;
    if (email) {
      const storedCode: GeneratedCode = await retrieveValidationCode(email);
      if (
        storedCode &&
        storedCode.code === code &&
        !isCodeExpired(storedCode.timestamp)
      ) {
        console.log("Verified removing form DB");
        await removeCodeFromDB(storedCode);
        res.status(200).json({ validated: true });
      } else if (isCodeExpired(storedCode.timestamp)) {
        res.status(200).json({ validated: false, expired: true });
      } else {
        res.status(200).json({ validated: false, expired: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
