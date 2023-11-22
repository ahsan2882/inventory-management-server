import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const privateKey: string | undefined =
  process.env.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

const serviceAccount = {
  type: "service_account",
  project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};

const serviceAccountKey = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL:
    "https://console.firebase.google.com/project/inventory-management-c54ae/firestore/data",
});

const db = admin.firestore();

export default db;
