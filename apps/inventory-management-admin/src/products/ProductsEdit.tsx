import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  NumberInput,
} from "react-admin";

import { CategoriesTitle } from "../categories/CategoriesTitle";
import { OrdersTitle } from "../orders/OrdersTitle";
import { SuppliersTitle } from "../suppliers/SuppliersTitle";

export const ProductsEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput
          source="category.id"
          reference="Categories"
          label="Category"
        >
          <SelectInput optionText={CategoriesTitle} />
        </ReferenceInput>
        <TextInput label="Description" multiline source="description" />
        <TextInput label="Image" source="image" />
        <TextInput label="Name" source="name" />
        <ReferenceArrayInput
          source="ordersItems"
          reference="Orders"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={OrdersTitle} />
        </ReferenceArrayInput>
        <NumberInput label="Price" source="price" />
        <NumberInput step={1} label="Quantity" source="quantity" />
        <ReferenceInput
          source="supplier.id"
          reference="Suppliers"
          label="Supplier"
        >
          <SelectInput optionText={SuppliersTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
