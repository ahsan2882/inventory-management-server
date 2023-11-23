import { Router } from "express";
import {
  checkEmailInDB,
  checkUserNameInDB,
  login,
  signup,
} from "../controllers/userController";
import { limiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/signup", limiter, signup);

router.post("/login", limiter, login);

router.post("/availability/userName", limiter, checkUserNameInDB);

router.post("/availability/email", limiter, checkEmailInDB);

export default router;
