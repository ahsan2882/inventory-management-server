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

  async modifyCategories(
    additions: Partial<CategoryDB>[],
    updates: Partial<CategoryDB>[],
    deletions: Partial<CategoryDB>[],
  ): Promise<Category[]> {
    const promises = [];
    if (additions.length > 0) {
      let batch = this.categoryCollection.batch();
      for (const addition of additions) {
        const { categoryName, parentCategoryId } = addition;
        const newCategoryRef = this.categoryCollectionRef.doc();
        const newCategory: Partial<CategoryDB> = {
          categoryName,
          parentCategoryId,
          childCategories: [],
        };
        batch.set(newCategoryRef, newCategory);
        if (parentCategoryId !== "") {
          const parentRef = this.categoryCollectionRef.doc(parentCategoryId);
          const parentSnapshot = await parentRef.get();
          if (parentSnapshot.exists) {
            const { childCategories } = parentSnapshot.data() as CategoryDB;
            childCategories.push(newCategoryRef.id);
            batch.update(parentRef, { childCategories });
          }
        }
      }
      promises.push(
        batch
          .commit()
          .then(() => {
            console.log("added successfully");
          })
          .catch((err) => {
            console.log("Error adding categories:", err);
          }),
      );
    }
    try {
      promises.push(
        this.categoryCollection.runTransaction(async (transaction) => {
          if (updates.length > 0) {
            for (const update of updates) {
              const { id, categoryName } = update;
              const categoryRef = this.categoryCollectionRef.doc(id);
              const categorySnapshot = await categoryRef.get();
              if (categorySnapshot.exists) {
                transaction.update(categoryRef, { categoryName });
              }
            }
          }
          if (deletions.length > 0) {
            for (const deletion of deletions) {
              const { id, parentCategoryId } = deletion;
              const categoryRef = this.categoryCollectionRef.doc(id);
              const currentSnapshot = await categoryRef.get();
              if (currentSnapshot.exists) {
                const { childCategories } =
                  currentSnapshot.data() as CategoryDB;
                for (const childId of childCategories) {
                  const childRef = this.categoryCollectionRef.doc(childId);
                  transaction.delete(childRef);
                }
                if (parentCategoryId !== "") {
                  const parentRef =
                    this.categoryCollectionRef.doc(parentCategoryId);
                  const parentSnapshot = await parentRef.get();
                  const parentData = parentSnapshot.data() as CategoryDB;
                  const newChildIds = parentData.childCategories.reduce(
                    (acc, childId) => {
                      if (childId !== id) {
                        acc.push(childId);
                      }
                      return acc;
                    },
                    [],
                  );
                  transaction.update(parentRef, {
                    childCategories: newChildIds,
                  });
                }
                transaction.delete(categoryRef);
              }
            }
          }
        }),
      );
    } catch (error) {
      console.log(error);
    }
    await Promise.all(promises);
    return await this.generateCategoryTree();
  }
}
