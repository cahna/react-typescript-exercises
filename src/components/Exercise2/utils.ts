import { uniqueId, some, isEmpty, trim, pickBy, findIndex } from "lodash";

import { InventoryItem, RowValidationErrors, InventoryRow } from "./types";

export const makeEmptyRow = () => ({
  id: uniqueId("row_"),
  item: {
    barcode: "",
    name: "",
    count: 0,
    price: 0
  },
  validationErrors: {}
});

export const validateItem = (item: InventoryItem): RowValidationErrors => {
  if (!some(Object.values(item))) {
    // Row is empty
    return {};
  }
  let validationErrors: RowValidationErrors = {};

  if (isEmpty(item.barcode)) {
    validationErrors.barcode = "Required";
  } else if (!/^[a-z0-9]+$/i.test(item.barcode)) {
    validationErrors.barcode = "Only letters and numbers allowed";
  }

  if (isEmpty(trim(item.name))) {
    validationErrors.name = "Required";
  }

  if (item.count < 0) {
    validationErrors.count = ">=0";
  }

  if (item.price < 0) {
    validationErrors.price = ">=0";
  }

  return validationErrors;
};

export const getDuplicateBarcodeRows = (
  inventory: Readonly<InventoryRow[]>
): Record<string, string[]> =>
  pickBy(
    inventory.reduce((lookup, { item, id }) => {
      const barcode = trim(item.barcode);
      if (isEmpty(barcode)) {
        return lookup;
      }
      return {
        ...lookup,
        [barcode]: [...(lookup[barcode] ?? []), id]
      };
    }, {} as Record<string, string[]>),
    (value: string[]) => value.length > 1
  );

export const updateRowBarcodeErrors = (
  inventory: Readonly<InventoryRow[]>,
  duplicateBarcodeRows: Record<string, string[]>
): Readonly<InventoryRow[]> => {
  const updatedInventory = [...inventory];
  let nUpdates = 0;
  Object.entries(duplicateBarcodeRows).forEach(([barcode, rowIds]) => {
    rowIds.forEach((rowId) => {
      const rowIndex = findIndex(
        updatedInventory,
        ({ id }: InventoryRow) => id === rowId
      );
      const row = updatedInventory[rowIndex];
      if (row.validationErrors.barcode?.startsWith("Duplicate")) {
        // Error already set (prevents infinite useEffect recursion)
        return;
      }
      nUpdates += 1;
      const validationErrors = {
        ...row.validationErrors,
        barcode: `Duplicate: ${barcode}`
      };
      const updatedRow = {
        ...row,
        validationErrors
      };
      updatedInventory.splice(rowIndex, 1, updatedRow);
    });
  });
  return nUpdates > 0 ? updatedInventory : inventory;
};
