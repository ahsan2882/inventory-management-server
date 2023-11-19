import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { trackUserActivity } from "../middleware/trackUserActivity";
import {
  createCategory,
  getParentCategories,
  getSubcategoriesByParentID,
} from "../controllers/categoriesController";

const router = express.Router();

router.get("/", authenticateToken, trackUserActivity, getParentCategories);

router.get(
  "/:parentCategoryID",
  authenticateToken,
  trackUserActivity,
  getSubcategoriesByParentID
);

router.post("/", authenticateToken, trackUserActivity, createCategory);

// router.post(
//   "/:parentCategoryID/subcategories",
//   authenticateToken,
//   trackUserActivity,
//   categoriesController.createSubcategory
// );

export default router;
