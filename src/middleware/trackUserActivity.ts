import { NextFunction, Request, Response } from "express";
import { getUser, updateLastActivity } from "../controllers/userController";
import jwt from "jsonwebtoken";
import { SECRET_JWT_TOKEN } from "../firebaseConfig";

export const trackUserActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, SECRET_JWT_TOKEN) as {
      userId: string;
    };
    if (decodedToken && decodedToken.userId) {
      // Extract userId from the decoded token and update lastActiveTimestamp
      const userId = decodedToken.userId;
      const user = await getUser(userId);
      if (user?.isLoggedIn) {
        await updateLastActivity(userId);
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
