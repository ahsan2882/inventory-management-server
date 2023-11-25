import { firestore } from "firebase-admin";
import db from "../firebaseConfig";
import { DocumentData } from "firebase/firestore";

export interface Category {
  id: string;
  label: string;
  children: Category[];
}

export interface CategoryDB {
  id: string;
  categoryName: string;
  parentCategoryId: string;
  childCategories: string[];
}
export class CategoryUtils {
  private categoryCollection: firestore.Firestore;
  private categoryCollectionRef: firestore.CollectionReference;

  constructor(userId: string) {
    this.categoryCollection = db;
    this.categoryCollectionRef = this.categoryCollection
      .collection("users")
      .doc(userId)
      .collection("categories");
  }

  private async fetchCategories(): Promise<CategoryDB[]> {
    const categoriesSnapshot = await this.categoryCollectionRef.get();
    return categoriesSnapshot.docs.map((snapshot: DocumentData) => ({
      id: snapshot.id,
      ...(snapshot.data() as CategoryDB),
    }));
  }

  private buildTree(
    categoryDB: CategoryDB,
    categoryDocuments: CategoryDB[],
  ): Category {
    const { categoryName, id, childCategories } = categoryDB;
    const node: Category = { label: categoryName, id, children: [] };
    const children = childCategories.reduce(
      (acc: Category[], childId: string) => {
        const childDB = categoryDocuments.find((doc) => doc.id === childId);
        if (childDB) {
          acc.push(this.buildTree(childDB, categoryDocuments));
        }
        return acc;
      },
      [],
    );

    node.children = children;
    return node;
  }

  async generateCategoryTree(): Promise<Category[]> {
    const categoryDocuments = await this.fetchCategories();
    const topLevelCategories = categoryDocuments.filter(
      (doc) => doc.parentCategoryId === "",
    );
    return topLevelCategories.map((category) =>
      this.buildTree(category, categoryDocuments),
    );
  }

  private async addNewCategoryToBatch(
    addition: Partial<CategoryDB>,
    batch: firestore.WriteBatch,
  ): Promise<void> {
    const { categoryName, parentCategoryId } = addition;
    const newCategoryRef = this.categoryCollectionRef.doc();
    const newCategory: Partial<CategoryDB> = {
      categoryName,
      parentCategoryId,
      childCategories: [],
    };
    batch.set(newCategoryRef, newCategory);
    if (parentCategoryId !== "") {
      await this.updateChildIdsForParent(
        parentCategoryId,
        newCategoryRef.id,
        "add",
        batch,
      );
    }
  }

  private async updateChildIdsForParent(
    parentCategoryId: string,
    categoryId: string,
    operation: "add" | "delete",
    transcationBatch: firestore.WriteBatch | firestore.Transaction,
  ): Promise<void> {
    const parentRef = this.categoryCollectionRef.doc(parentCategoryId);
    const parentSnapshot = await parentRef.get();
    if (parentSnapshot.exists) {
      const { childCategories } = parentSnapshot.data() as CategoryDB;
      if (
        operation === "add" &&
        transcationBatch instanceof firestore.WriteBatch
      ) {
        childCategories.push(categoryId);
        transcationBatch.update(parentRef, { childCategories });
      }
      if (
        operation == "delete" &&
        transcationBatch instanceof firestore.Transaction
      ) {
        const newChildIds = childCategories.reduce((acc, childId) => {
          if (childId !== categoryId) {
            acc.push(childId);
          }
          return acc;
        }, []);
        transcationBatch.update(parentRef, {
          childCategories: newChildIds,
        });
      }
    }
  }

  private async addNewCategories(additions: Partial<CategoryDB>[]) {
    const batch = this.categoryCollection.batch();
    for (const addition of additions) {
      await this.addNewCategoryToBatch(addition, batch);
    }
    const addPromises: Promise<void> = batch
      .commit()
      .then(() => {
        console.log("added successfully");
      })
      .catch((err) => {
        console.log("Error adding categories:", err);
      });

    return addPromises;
  }

  private async updateCategoriesBulk(
    updates: Partial<CategoryDB>[],
  ): Promise<void> {
    const updatePromise = this.categoryCollection.runTransaction(
      async (transaction) => {
        for (const update of updates) {
          await this.updateCategory(update, transaction);
        }
      },
    );
    return updatePromise;
  }

  private async updateCategory(
    update: Partial<CategoryDB>,
    transaction: firestore.Transaction,
  ): Promise<void> {
    const { id, categoryName } = update;
    const categoryRef = this.categoryCollectionRef.doc(id);
    const categorySnapshot = await categoryRef.get();
    if (categorySnapshot.exists) {
      transaction.update(categoryRef, { categoryName });
    }
  }

  private deleteCategoryChildren(
    currentSnapshot: firestore.DocumentSnapshot<DocumentData>,
    transaction: firestore.Transaction,
  ) {
    const { childCategories } = currentSnapshot.data() as CategoryDB;
    for (const childId of childCategories) {
      const childRef = this.categoryCollectionRef.doc(childId);
      transaction.delete(childRef);
    }
  }

  private async deleteCategory(
    deletion: Partial<CategoryDB>,
    transaction: firestore.Transaction,
  ) {
    const { id, parentCategoryId } = deletion;
    const categoryRef = this.categoryCollectionRef.doc(id);
    const currentSnapshot = await categoryRef.get();
    if (currentSnapshot.exists) {
      this.deleteCategoryChildren(currentSnapshot, transaction);
      if (parentCategoryId !== "") {
        this.updateChildIdsForParent(
          parentCategoryId,
          id,
          "delete",
          transaction,
        );
      }
      transaction.delete(categoryRef);
    }
  }

  private async deleteCategoryBulk(deletions: Partial<CategoryDB>[]) {
    return this.categoryCollection.runTransaction(async (transaction) => {
      for (const deletion of deletions) {
        await this.deleteCategory(deletion, transaction);
      }
    });
  }

  async modifyCategories(
    additions: Partial<CategoryDB>[],
    updates: Partial<CategoryDB>[],
    deletions: Partial<CategoryDB>[],
  ): Promise<Category[]> {
    const promises: Promise<void>[] = [];
    try {
      promises.push(this.addNewCategories(additions));
      promises.push(this.updateCategoriesBulk(updates));
      promises.push(this.deleteCategoryBulk(deletions));
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
    return await this.generateCategoryTree();
  }
}
