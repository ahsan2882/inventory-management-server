import { Suppliers as TSuppliers } from "../api/suppliers/Suppliers";

export const SUPPLIERS_TITLE_FIELD = "name";

export const SuppliersTitle = (record: TSuppliers): string => {
  return record.name?.toString() || String(record.id);
};
