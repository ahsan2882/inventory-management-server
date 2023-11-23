import { Request, Response } from "express";
import db from "../firebaseConfig";
import User from "../models/User";
import bcrypt from "bcrypt";
import { firestore } from "firebase-admin";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, email, password } = req.body;
    if (!userName && !email) {
      res.status(400).json({ error: "Please provide username or email" });
      return;
    }
    let userQuery: firestore.Query = db.collection("users");
    if (userName) {
      userQuery = userQuery.where("userName", "==", userName);
    } else if (email) {
      userQuery = userQuery.where("email", "==", email);
    }
    const userSnapshot = await userQuery.limit(1).get();
    if (userSnapshot.empty) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data() as User;
    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: userDoc.id },
        process.env.SECRET_JWT_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ error: "Incorrect userName or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkUserNameInDB = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userName } = req.body;
    if (!!userName) {
      const userNameQuery = await db
        .collection("users")
        .where("userName", "==", userName)
        .get();
      if (!userNameQuery.empty) {
        res.status(200).json({ exists: true });
        return;
      } else {
        res.status(200).json({ exists: false });
      }
    } else {
      res.status(400).json({ message: "no username provided" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkEmailInDB = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    if (!!email) {
      const emailQuery = await db
        .collection("users")
        .where("email", "==", email)
        .get();
      if (!emailQuery.empty) {
        res.status(200).json({ exists: true });
        return;
      } else {
        res.status(200).json({ exists: false });
      }
    } else {
      res.status(400).json({ message: "no email provided" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fullName, password, userName } = req.body;
    if (!!email && !!fullName && !!password && !!userName) {
      const userCollection = db.collection("users");
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const newUserInfo: User = {
        email,
        fullName,
        password: hash,
        userName,
      };
      const newUserRef = await userCollection.add(newUserInfo);
      const token = jwt.sign(
        { userId: newUserRef.id },
        process.env.SECRET_JWT_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({
        message: "New user signed up",
        id: newUserRef.id,
        token,
      });
    } else {
      const missingFields: string[] = [];
      if (!email) missingFields.push("email");
      if (!fullName) missingFields.push("fullName");
      if (!password) missingFields.push("password");
      if (!userName) missingFields.push("userName");
      res.status(400).json({
        error: `Please provide the following values: ${missingFields.join(
          ", "
        )}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const user = await db.collection("users").doc(userId).get();
    if (user.exists) return user.data() as User;
    return null;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
