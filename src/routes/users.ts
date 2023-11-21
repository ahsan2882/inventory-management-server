import { Router } from "express";
import {
  checkEmailInDB,
  checkUserNameInDB,
  login,
  signup,
} from "../controllers/userController";

const router = Router();

/* GET home page. */
router.post("/signup", signup);
router.post("/login", login);
router.post("/availability/userName", checkUserNameInDB);
router.post("/availability/email", checkEmailInDB);

export default router;
