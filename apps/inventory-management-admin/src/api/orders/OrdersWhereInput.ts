import { StringFilter } from "../../util/StringFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { ProductsWhereUniqueInput } from "../products/ProductsWhereUniqueInput";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";

export type OrdersWhereInput = {
  id?: StringFilter;
  orderDate?: DateTimeNullableFilter;
  product?: ProductsWhereUniqueInput;
  quantity?: IntNullableFilter;
  totalPrice?: FloatNullableFilter;
};
