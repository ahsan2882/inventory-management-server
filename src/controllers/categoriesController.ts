import { Request, Response } from "express";
import { CategoryUtils } from "../models/Category";

export const getCategoryTree = async (req: Request, res: Response) => {
  try {
    const userId: string = req.headers["userId"] as string;
    const categoryUtils = new CategoryUtils(userId);
    const tree = await categoryUtils.generateCategoryTree();
    return res.status(200).json({ tree });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const modifyCategories = async (req: Request, res: Response) => {
  try {
    const userId: string = req.headers["userId"] as string;
    const categoryUtils = new CategoryUtils(userId);
    let { additions, updates, deletions } = req.body as {
      additions?: [];
      updates?: [];
      deletions?: [];
    };
    if (!additions) {
      additions = [];
    }
    if (!updates) {
      updates = [];
    }
    if (!deletions) {
      deletions = [];
    }

    const tree = await categoryUtils.modifyCategories(
      additions,
      updates,
      deletions
    );
    return res.status(200).json({ tree });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Servor Error" });
  }
};
