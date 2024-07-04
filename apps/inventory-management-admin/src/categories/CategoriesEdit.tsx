import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { ProductsTitle } from "../products/ProductsTitle";

export const CategoriesEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Description" multiline source="description" />
        <TextInput label="Name" source="name" />
        <TextInput label="parentCategory" source="parentCategory" />
        <ReferenceArrayInput
          source="productsItems"
          reference="Products"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={ProductsTitle} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
