import { Router } from "express";
import { login, signup } from "../controllers/userController";

const router = Router();

/* GET home page. */
router.post("/signup", signup);
router.post("/login", login);

export default router;
