import express from "express";
import {
  validateCodeFromUser,
  validateUserEmail,
} from "../controllers/validationController";
import { limiter } from "../middleware/rateLimiter";

const router = express.Router();

router.post("/email", limiter, validateUserEmail);
router.post("/code", limiter, validateCodeFromUser);
export default router;
