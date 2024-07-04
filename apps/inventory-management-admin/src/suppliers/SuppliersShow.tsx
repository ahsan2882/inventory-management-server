import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { CATEGORIES_TITLE_FIELD } from "../categories/CategoriesTitle";
import { SUPPLIERS_TITLE_FIELD } from "./SuppliersTitle";

export const SuppliersShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="ContactEmail" source="contactEmail" />
        <TextField label="ContactPhone" source="contactPhone" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Name" source="name" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="Products"
          target="supplierId"
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
