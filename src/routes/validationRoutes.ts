import express from "express";
import {
  validateCodeFromUser,
  validateUserEmail,
} from "../controllers/validationController";

const router = express.Router();

router.post("/email", validateUserEmail);
router.post("/code", validateCodeFromUser);
export default router;
