import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { CATEGORIES_TITLE_FIELD } from "./CategoriesTitle";
import { SUPPLIERS_TITLE_FIELD } from "../suppliers/SuppliersTitle";

export const CategoriesShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="Description" source="description" />
        <TextField label="ID" source="id" />
        <TextField label="Name" source="name" />
        <TextField label="parentCategory" source="parentCategory" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="Products"
          target="categoryId"
          label="ProductsItems"
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
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
