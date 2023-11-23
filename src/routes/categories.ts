import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { limiter } from "../middleware/rateLimiter";
import {
  createCategory,
  getParentCategories,
  getSubcategoriesByParentID,
} from "../controllers/categoriesController";

const router = express.Router();

router.get("/", limiter, authenticateToken, getParentCategories);

router.get(
  "/:parentCategoryID",
  limiter,
  authenticateToken,
  getSubcategoriesByParentID
);

router.post("/", limiter, authenticateToken, createCategory);

export default router;
