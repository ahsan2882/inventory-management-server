import * as admin from "firebase-admin";
import * as serviceAccount from "./serviceAccountKey.json";

const serviceAccountKey = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL:
    "https://console.firebase.google.com/project/inventory-management-c54ae/firestore/data",
});

const db = admin.firestore();

export default db;
export const SECRET_JWT_TOKEN =
  "o3DfpnH7XNY35Uvl1QEiZ3cco2srBTRIGUYb3H4mIaDsG1kM428i4KISff6sct6ayfCSiOc1mC83TDOCFFdhyUTf2FFw";
