import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { trackUserActivity } from "../middleware/trackUserActivity";
import { limiter } from "../middleware/rateLimiter";
import {
  createCategory,
  getParentCategories,
  getSubcategoriesByParentID,
} from "../controllers/categoriesController";

const router = express.Router();

router.get(
  "/",
  limiter,
  authenticateToken,
  trackUserActivity,
  getParentCategories
);

router.get(
  "/:parentCategoryID",
  limiter,
  authenticateToken,
  trackUserActivity,
  getSubcategoriesByParentID
);

router.post("/", limiter, authenticateToken, trackUserActivity, createCategory);

// router.post(
//   "/:parentCategoryID/subcategories",
//   authenticateToken,
//   trackUserActivity,
//   categoriesController.createSubcategory
// );

export default router;
