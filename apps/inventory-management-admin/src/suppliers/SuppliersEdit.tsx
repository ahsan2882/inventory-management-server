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

export const SuppliersEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
