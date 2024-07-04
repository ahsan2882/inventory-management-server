import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { CATEGORIES_TITLE_FIELD } from "../categories/CategoriesTitle";
import { SUPPLIERS_TITLE_FIELD } from "../suppliers/SuppliersTitle";

export const ProductsList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"ProductsItems"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <ReferenceField
          label="Category"
          source="categories.id"
          reference="Categories"
        >
          <TextField source={CATEGORIES_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <TextField label="Description" source="description" />
        <TextField label="ID" source="id" />
        <TextField label="Image" source="image" />
        <TextField label="Name" source="name" />
        <TextField label="Price" source="price" />
        <TextField label="Quantity" source="quantity" />
        <ReferenceField
          label="Supplier"
          source="suppliers.id"
          reference="Suppliers"
        >
          <TextField source={SUPPLIERS_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
