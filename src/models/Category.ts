interface Category {
  id?: string;
  categoryName: string;
  isTopLevel: boolean;
  parentCategoryID: string | null;
}
export default Category;
