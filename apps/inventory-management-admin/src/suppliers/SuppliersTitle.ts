import { Suppliers as TSuppliers } from "../api/suppliers/Suppliers";

export const SUPPLIERS_TITLE_FIELD = "id";

export const SuppliersTitle = (record: TSuppliers): string => {
  return record.id?.toString() || String(record.id);
};
