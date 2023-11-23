import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  jwt.verify(token, process.env.SECRET_JWT_TOKEN, async (err) => {
    if (err) {
      return res.status(403).json({
        message: "Unauthorized: Invalid token",
        tokenInvalidated: true,
      });
    }

    next();
  });
};
