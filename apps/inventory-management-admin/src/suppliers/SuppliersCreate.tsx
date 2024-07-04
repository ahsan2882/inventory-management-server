import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { ProductsTitle } from "../products/ProductsTitle";

export const SuppliersCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="ContactEmail" source="contactEmail" type="email" />
        <TextInput label="ContactPhone" source="contactPhone" />
        <TextInput label="Name" source="name" />
        <ReferenceArrayInput
          source="productsItems"
          reference="Products"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={ProductsTitle} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
