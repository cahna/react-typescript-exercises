import { InventoryRow } from "../types";
import {
  makeEmptyRow,
  validateItem,
  getDuplicateBarcodeRows,
  updateRowBarcodeErrors
} from "../utils";

describe("Exercise2/utils", () => {
  describe("makeEmptyRow()", () => {
    it("generates a new empty row object", () => {
      const row = makeEmptyRow();
      expect(row.id).toMatch(/^row_.+$/i);
      expect(row.item).toEqual({
        barcode: "",
        name: "",
        count: 0,
        price: 0
      });
      expect(row.validationErrors).toEqual({});
    });
  });

  describe("validateItem()", () => {
    describe("for empty row", () => {
      it("returns no validation errors", () => {
        expect(validateItem(makeEmptyRow().item)).toEqual({});
      });
    });
  });

  describe("getDuplicateBarcodeRows()", () => {
    describe("for empty rows", () => {
      it("returns no duplicates found", () => {
        const rows = [makeEmptyRow(), makeEmptyRow(), makeEmptyRow()];
        expect(getDuplicateBarcodeRows(rows)).toEqual({});
      });
    });
  });

  describe("getDuplicateBarcodeRows()", () => {
    describe("empty inputs", () => {
      it("returns no updates", () => {
        const inventory: Readonly<InventoryRow[]> = [];
        const duplicateBarcodeRows = {};
        const [nUpdates, updatedInventory] = updateRowBarcodeErrors(
          inventory,
          duplicateBarcodeRows
        );
        expect(nUpdates).toBe(0);
        expect(updatedInventory).toBe(inventory);
      });
    });
  });
});
