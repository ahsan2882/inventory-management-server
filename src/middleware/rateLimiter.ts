import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const limiter =
  process.env.NODE_ENV === "production"
    ? rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
      })
    : (req: Request, res: Response, next: NextFunction) => next(); // No rate limit in non-production environments
