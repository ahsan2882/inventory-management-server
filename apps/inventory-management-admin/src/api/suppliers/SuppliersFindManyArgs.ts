import { SuppliersWhereInput } from "./SuppliersWhereInput";
import { SuppliersOrderByInput } from "./SuppliersOrderByInput";

export type SuppliersFindManyArgs = {
  where?: SuppliersWhereInput;
  orderBy?: Array<SuppliersOrderByInput>;
  skip?: number;
  take?: number;
};
