import { Request, Response } from "express";
import db from "../firebaseConfig";
import Category from "../models/Category";
import { DocumentData } from "firebase/firestore";

export const getParentCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parentCategoriesSnapshot = await db
      .collection("categories")
      .where("parentCategoryID", "==", "")
      .get();

    const parentCategories: Category[] = parentCategoriesSnapshot.docs.reduce<
      Category[]
    >((acc, doc: DocumentData) => {
      const data = doc.data() as Category;
      if (data) {
        const { categoryName, parentCategoryID } = data;
        acc.push({ id: doc.id, categoryName, parentCategoryID });
      }
      return acc;
    }, []);

    res.json(parentCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSubcategoriesByParentID = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { parentCategoryID } = req.params;
    if (parentCategoryID) {
      const subcategoriesSnapshot = await db
        .collection("categories")
        .where("parentCategoryID", "==", parentCategoryID)
        .get();

      const subcategories: Category[] = subcategoriesSnapshot.docs.reduce<
        Category[]
      >((acc, doc: DocumentData) => {
        const data = doc.data() as Category;
        if (data) {
          const { categoryName, parentCategoryID } = data;
          acc.push({ id: doc.id, categoryName, parentCategoryID });
        }
        return acc;
      }, []);

      res.status(200).json(subcategories);
    } else {
      res.status(400).json({ message: "Provide parent category" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { categoryName, parentCategoryID } = req.body;
    let newCategory: Category;
    if (categoryName) {
      if (!parentCategoryID) {
        newCategory = { categoryName, parentCategoryID: "" };
      } else {
        newCategory = { categoryName, parentCategoryID };
      }
      const newCategoryRef = await db.collection("categories").add(newCategory);
      res.status(201).json({
        message: "Category created successfully",
        id: newCategoryRef.id,
      });
    } else {
      res.status(400).json({ message: "Provide the category name" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const createSubcategory = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { categoryName, parentCategoryID } = req.body;
//     const newSubcategoryRef = await db.collection("categories").add({
//       categoryName,
//       parentCategoryID,
//       isTopLevel: false,
//     });
//     res.status(201).json({
//       message: "Subcategory created successfully",
//       id: newSubcategoryRef.id,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const deleteCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params; // Assuming the ID of the subcategory is passed in the request params
    const categoryRef = db.collection("categories").doc(id);

    const subcategoryDoc = await categoryRef.get();
    if (!subcategoryDoc.exists) {
      res.status(404).json({ error: "Subcategory not found" });
      return;
    }

    const subcategoryData = subcategoryDoc.data() as Category;
    if (!subcategoryData.parentCategoryID) {
      await categoryRef.delete();
      res.status(200).json({ message: "Subcategory deleted successfully" });
    } else {
      res.status(400).json({
        error: "Cannot delete top-level category as a subcategory",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
