import { Request, Response } from "express";
import db from "../firebaseConfig"; // Import Firebase setup
import Component from "../models/Component";
import { firestore } from "firebase-admin";
import { DocumentData } from "@google-cloud/firestore";

export const getComponentsByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categoryID = (req.query.categoryID || req.query.c) as
      | string
      | undefined;
    const subCategoryID = (req.query.subCategoryID || req.query.s) as
      | string
      | undefined;

    if (!categoryID && !subCategoryID) {
      res.status(400).json({
        error: "Provide categoryID and/or subCategoryID as query parameters",
      });
      return;
    }

    let componentsQuery: firestore.Query = db.collection("components");

    if (categoryID && subCategoryID) {
      componentsQuery = componentsQuery
        .where("categoryID", "==", categoryID)
        .where("subCategoryID", "==", subCategoryID);
    } else if (categoryID) {
      componentsQuery = componentsQuery.where("categoryID", "==", categoryID);
    } else if (subCategoryID) {
      componentsQuery = componentsQuery.where(
        "subCategoryID",
        "==",
        subCategoryID,
      );
    }

    const componentsSnapshot = await componentsQuery.get();
    const components: Component[] = componentsSnapshot.docs.map(
      (doc: DocumentData) => ({
        id: doc.id,
        ...(doc.data() as Component),
      }),
    );

    res.status(200).json(components);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addComponent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      componentName,
      categoryID,
      subCategoryID,
      quantityAvailable,
      description,
    }: Component = req.body;
    if (
      componentName &&
      categoryID &&
      subCategoryID &&
      quantityAvailable &&
      description
    ) {
      const newComponent: Component = {
        componentName,
        categoryID,
        subCategoryID,
        quantityAvailable,
        description,
      };
      const docRef = await db.collection("components").add(newComponent);
      res
        .status(201)
        .json({ message: "Component added successfully", id: docRef.id });
    } else {
      const missingFields: string[] = [];
      if (!componentName) missingFields.push("componentName");
      if (!categoryID) missingFields.push("categoryID");
      if (!subCategoryID) missingFields.push("subCategoryID");
      if (!quantityAvailable) missingFields.push("quantityAvailable");
      if (!description) missingFields.push("description");
      res.status(400).json({
        error: `Please provide the following values: ${missingFields.join(
          ", ",
        )}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateComponent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      componentName,
      quantityAvailable,
      description,
      categoryID,
      subCategoryID,
    }: Partial<Component> = req.body;
    const componentRef = db.collection("components").doc(id);
    const componentDoc = await componentRef.get();
    if (!componentDoc.exists) {
      res.status(404).json({ error: "Component not found" });
      return;
    }
    const existingComponent: Component = componentDoc.data() as Component;
    const updatedComponent: Partial<Component> = {
      quantityAvailable:
        quantityAvailable ?? existingComponent.quantityAvailable,
      description: description ?? existingComponent.description,
      categoryID: categoryID ?? existingComponent.categoryID,
      subCategoryID: subCategoryID ?? existingComponent.subCategoryID,
      componentName: componentName ?? existingComponent.componentName,
    };
    await componentRef.update(updatedComponent);
    res.status(200).json({ message: "Component updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteComponent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    if (id) {
      const componentRef = db.collection("components").doc(id);

      const componentDoc = await componentRef.get();
      if (!componentDoc.exists) {
        res.status(404).json({ error: "Component not found" });
        return;
      }

      await componentRef.delete();
      res.status(200).json({ message: "Component deleted successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Provide the id of the component to be deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
