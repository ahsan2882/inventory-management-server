import { DocumentData } from "firebase/firestore";
import db from "../firebaseConfig";
import { firestore } from "firebase-admin";

interface User {
  id: string;
  fullName?: string;
  email: string;
  userName: string;
  password: string;
}

export class UserModel {
  private usersCollection: firestore.CollectionReference;
  constructor() {
    this.usersCollection = db.collection("users");
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersCollection.where("email", "==", email).get();
    if (user.empty) {
      return null;
    } else {
      return user.docs.reduce((acc: User | null, doc: DocumentData) => {
        if (!acc) {
          return { id: doc.id, ...doc.data() } as User;
        }
        return acc;
      }, null);
    }
  }
  async findByUsername(userName: string): Promise<User | null> {
    const user = await this.usersCollection
      .where("userName", "==", userName)
      .get();
    if (user.empty) {
      return null;
    } else {
      return user.docs.reduce((acc: User | null, doc: DocumentData) => {
        if (!acc) {
          return { id: doc.id, ...doc.data() } as User;
        }
        return acc;
      }, null);
    }
  }
  async createUser(userData: Partial<User>): Promise<User> {
    const newUserRef = await this.usersCollection.add(userData);
    const newUserDoc = await newUserRef.get();
    return { id: newUserDoc.id, ...newUserDoc.data() } as User;
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const userRef = this.usersCollection.doc(userId);
    await userRef.update({ password: newPassword });
  }

  async deleteUser(userId: string): Promise<void> {
    const userRef = this.usersCollection.doc(userId);
    await userRef.delete();
  }
}
