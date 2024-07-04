import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";

import { ProductsTitle } from "../products/ProductsTitle";

export const OrdersCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateTimeInput label="OrderDate" source="orderDate" />
        <ReferenceInput
          source="product.id"
          reference="Products"
          label="Product"
        >
          <SelectInput optionText={ProductsTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Quantity" source="quantity" />
        <NumberInput label="TotalPrice" source="totalPrice" />
      </SimpleForm>
    </Create>
  );
};
