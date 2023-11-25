import { Request, Response } from "express";
import { GeneratedCode, ValidaionUtils } from "../models/ValidationCode";

const validationUtil = new ValidaionUtils();

export const validateUserEmail = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { emailTo, fullName } = req.body;
    if (!!emailTo && !!fullName) {
      const { code, timestamp } = validationUtil.generateRandomCode();
      await validationUtil.storeVerificationCode(emailTo, code, timestamp);
      const sent = await validationUtil.sendVerificationEmail(
        emailTo,
        fullName,
        code,
      );
      return res.status(200).json({
        sentEmail: sent,
      });
    }
    return res.status(400).json({ message: "Provide an email address" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const validateCodeFromUser = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    if (email) {
      const storedCodes: GeneratedCode[] =
        await validationUtil.retrieveValidationCode(email);
      if (storedCodes.length) {
        const storedCode = storedCodes.find((storedCodeInDB) => {
          storedCodeInDB.code === code;
        });
        if (storedCode && !validationUtil.isCodeExpired(storedCode.timestamp)) {
          console.log("Verified removing form DB");
          await validationUtil.removeCodeFromDB(storedCode);
          return res.status(200).json({ validated: true });
        }
        if (validationUtil.isCodeExpired(storedCode.timestamp)) {
          return res.status(200).json({ validated: false, expired: true });
        }
        return res.status(200).json({ validated: false, expired: false });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
