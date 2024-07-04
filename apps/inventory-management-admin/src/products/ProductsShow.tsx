import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  ReferenceField,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { PRODUCTS_TITLE_FIELD } from "./ProductsTitle";
import { CATEGORIES_TITLE_FIELD } from "../categories/CategoriesTitle";
import { SUPPLIERS_TITLE_FIELD } from "../suppliers/SuppliersTitle";

export const ProductsShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
        <ReferenceManyField
          reference="Orders"
          target="productId"
          label="OrdersItems"
        >
          <Datagrid rowClick="show">
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <TextField label="OrderDate" source="orderDate" />
            <ReferenceField
              label="Product"
              source="products.id"
              reference="Products"
            >
              <TextField source={PRODUCTS_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Quantity" source="quantity" />
            <TextField label="TotalPrice" source="totalPrice" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
