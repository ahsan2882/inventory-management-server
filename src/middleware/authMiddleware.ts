import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenBlacklist: string[] = [];

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  const deleteTokenFromBlackList = (blackList: string[], t: string) => {
    return blackList.reduce((acc, curr) => {
      if (curr !== t) {
        acc.push(curr);
      }
      return acc;
    }, []);
  };

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  jwt.verify(token, process.env.SECRET_JWT_TOKEN, async (err, decoded) => {
    if (err) {
      if (tokenBlacklist.includes(token)) {
        deleteTokenFromBlackList(tokenBlacklist, token);
      }
      return res.status(403).json({
        message: "Unauthorized: Invalid token",
        tokenInvalidated: true,
      });
    }
    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ message: "Unauthorized: Token revoked" });
    }
    req.headers["userId"] = decoded["userId"];

    next();
  });
};

export const revokeToken = (token: string) => {
  tokenBlacklist.push(token);
};
