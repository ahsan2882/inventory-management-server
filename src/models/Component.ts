interface Component {
  id?: string;
  componentName: string;
  categoryID: string;
  subCategoryID: string;
  quantityAvailable: number;
  description?: string;
  // Other fields as needed
}

export default Component;
