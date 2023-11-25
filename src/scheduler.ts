import cron from "node-cron";
import db from "./firebaseConfig";
import { GeneratedCode } from "./models/ValidationCode";
import { DocumentData } from "firebase/firestore";
import { ValidaionUtils } from "./models/ValidationCode";

const validationUtils = new ValidaionUtils();

const removeExpiredUnusedCodes = async () => {
  const generatedCodeCollection = await db.collection("generatedCodes").get();
  if (generatedCodeCollection.docs.length > 0) {
    const generatedCodes = generatedCodeCollection.docs.map(
      (doc: DocumentData) => ({
        id: doc.id,
        ...(doc.data() as GeneratedCode),
      })
    );

    generatedCodes.forEach(async (code: GeneratedCode) => {
      if (validationUtils.isCodeExpired(code.timestamp)) {
        await db.collection("generatedCodes").doc(code.id).delete();
      }
    });
  }
};

export const scheduleRemoval = () => {
  console.log("removing codes");
  cron.schedule("0 */6 * * *", () => {
    removeExpiredUnusedCodes();
  });
};
