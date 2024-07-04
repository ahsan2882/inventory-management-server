import { Categories as TCategories } from "../api/categories/Categories";

export const CATEGORIES_TITLE_FIELD = "name";

export const CategoriesTitle = (record: TCategories): string => {
  return record.name?.toString() || String(record.id);
};
