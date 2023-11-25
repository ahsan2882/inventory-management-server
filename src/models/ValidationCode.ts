import { firestore } from "firebase-admin";
import db from "../firebaseConfig";
import crypto from "crypto";
import nodemailer from "nodemailer";
import he from "he";
import { DocumentData } from "firebase/firestore";

export interface GeneratedCode {
  id: string;
  code: string;
  timestamp: number;
  email: string;
}

export class ValidaionUtils {
  private generatedCodesCollections: firestore.CollectionReference;
  constructor() {
    this.generatedCodesCollections = db.collection("generatedCodes");
  }
  generateRandomCode(): Pick<GeneratedCode, "code" | "timestamp"> {
    const randomCode = crypto.randomBytes(4).readUInt32LE(0) % 100000000; // Generate a random 8-digit number
    const timestamp = Date.now();
    return {
      code: randomCode.toString().padStart(8, "0"),
      timestamp: timestamp,
    };
  }
  async storeVerificationCode(email: string, code: string, timestamp: number) {
    await this.generatedCodesCollections.add({ email, code, timestamp });
  }
  async sendVerificationEmail(
    email: string,
    fullName: string,
    code: string,
  ): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
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
  }

  async retrieveValidationCode(email: string): Promise<GeneratedCode[]> {
    const generatedCodesSnapshot = this.generatedCodesCollections
      .where("email", "==", email)
      .get();
    const generatedCodes: GeneratedCode[] = (
      await generatedCodesSnapshot
    ).docs.map((doc: DocumentData) => ({
      id: doc.id,
      ...(doc.data() as GeneratedCode),
    }));
    return generatedCodes;
  }

  isCodeExpired(timestamp: number): boolean {
    if (Date.now() - timestamp > 15 * 60 * 1000) {
      return true;
    }
    return false;
  }

  async removeCodeFromDB(code: GeneratedCode): Promise<void> {
    await this.generatedCodesCollections.doc(code.id).delete();
  }
}
