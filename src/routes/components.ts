import express from "express";
import {
  getComponentsByCategory,
  addComponent,
  updateComponent,
  deleteComponent,
} from "../controllers/componentsController";
import { authenticateToken } from "../middleware/authMiddleware";
import { trackUserActivity } from "../middleware/trackUserActivity";
import { limiter } from "../middleware/rateLimiter";

const router = express.Router();

// GET components by category and/or subcategory
router.get(
  "/",
  limiter,
  authenticateToken,
  trackUserActivity,
  getComponentsByCategory
);

// POST to add a new component
router.post("/", limiter, authenticateToken, trackUserActivity, addComponent);

// PUT/PATCH to update a component
router.put(
  "/:id",
  limiter,
  authenticateToken,
  trackUserActivity,
  updateComponent
); // Use PUT for full updates, PATCH for partial updates

// DELETE a component
router.delete(
  "/:id",
  limiter,
  authenticateToken,
  trackUserActivity,
  deleteComponent
);

export default router;
