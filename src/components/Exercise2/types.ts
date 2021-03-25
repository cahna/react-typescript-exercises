export interface InventoryItem {
  barcode: string;
  name: string;
  count: number;
  price: number;
}

export type RowValidationErrors = Partial<Record<keyof InventoryItem, string>>;

export interface InventoryRow {
  id: string;
  item: Readonly<InventoryItem>;
  validationErrors: Readonly<RowValidationErrors>;
}
