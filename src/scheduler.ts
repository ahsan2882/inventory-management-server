import cron from "node-cron";
import db from "./firebaseConfig";
import { GeneratedCode } from "./models/ValidationCode";
import { DocumentData } from "firebase/firestore";
import { isCodeExpired } from "./controllers/validationController";

const removeExpiredUnusedCodes = async () => {
  const generatedCodes = (await db.collection("generatedCodes").get()).docs.map(
    (doc: DocumentData) => ({
      id: doc.id,
      ...(doc.data() as GeneratedCode),
    })
  );
  generatedCodes.forEach(async (code: GeneratedCode) => {
    if (isCodeExpired(code.timestamp)) {
      await db.collection("generatedCodes").doc(code.id).delete();
    }
  });
};

export const scheduleRemoval = () => {
  console.log("removing codes");
  cron.schedule("0 */6 * * *", () => {
    removeExpiredUnusedCodes();
  });
};
