import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { limiter } from "../middleware/rateLimiter";
import {
  modifyCategories,
  getCategoryTree,
} from "../controllers/categoriesController";

const router = express.Router();

router.post("/tree", limiter, authenticateToken, getCategoryTree);
router.post("/modify", limiter, authenticateToken, modifyCategories);

// router.get("/", limiter, authenticateToken, getParentCategories);

// router.get(
//   "/:parentCategoryID",
//   limiter,
//   authenticateToken,
//   getSubcategoriesByParentID,
// );

// router.post("/", limiter, authenticateToken, createCategory);

export default router;
