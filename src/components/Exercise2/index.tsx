import { FC, useState, useEffect } from "react";
import { Paper, Grid, Divider, Button, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { findIndex, identity, isEmpty } from "lodash";

import { InventoryItem, InventoryRow } from "./types";
import { useStyles } from "./styles";
import {
  makeEmptyRow,
  validateItem,
  getDuplicateBarcodeRows,
  updateRowBarcodeErrors
} from "./utils";
import InventoryRowInput from "./InventoryRowInput";

const Exercise2: FC<{}> = () => {
  const classes = useStyles();
  const [inventory, setInventory] = useState<Readonly<InventoryRow[]>>([
    makeEmptyRow()
  ]);

  const totalPrice = inventory.reduce(
    (total, { item }) => total + item.count * item.price,
    0
  );

  useEffect(() => {
    // Check for duplicate barcodes by saving list of row.id for each unique barcode
    const duplicateBarcodeRows = getDuplicateBarcodeRows(inventory);

    if (isEmpty(duplicateBarcodeRows)) {
      // No duplicates
      return;
    }

    const [nUpdates, updatedInventory] = updateRowBarcodeErrors(
      inventory,
      duplicateBarcodeRows
    );

    if (nUpdates > 0) {
      setInventory(updatedInventory);
    }
  }, [inventory]);

  const addRow = () =>
    setInventory((currentInventory) => [...currentInventory, makeEmptyRow()]);

  const removeRow = (rowId: string) =>
    setInventory((currentInventory) => {
      const rowIndex = findIndex(
        currentInventory,
        ({ id }: InventoryRow) => id === rowId
      );
      if (rowIndex < 0) {
        return currentInventory;
      }
      const updatedInventory = [...currentInventory];
      updatedInventory.splice(rowIndex, 1);
      return updatedInventory;
    });

  const updateItemField = (
    rowId: string,
    fieldName: keyof InventoryItem,
    value: InventoryItem[typeof fieldName],
    parse: (v: any) => InventoryItem[typeof fieldName] = identity
  ) =>
    setInventory((currentInventory) => {
      const rowIndex = findIndex(
        currentInventory,
        ({ id }: InventoryRow) => id === rowId
      );
      if (rowIndex < 0) {
        // Nothing to update
        return currentInventory;
      }
      const row = currentInventory[rowIndex];
      const updatedItem: InventoryItem = {
        ...row.item,
        [fieldName]: parse(value)
      };
      const updatedRow = {
        ...row,
        item: updatedItem,
        validationErrors: validateItem(updatedItem)
      };
      return Object.assign([], currentInventory, { [rowIndex]: updatedRow });
    });

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography component="h5" variant="h5">
            Inventory management
          </Typography>
        </Grid>
        <Grid container item xs={12} sm={6} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={addRow}
            startIcon={<AddShoppingCartIcon />}
          >
            Add Item
          </Button>
        </Grid>
        <Divider className={classes.divider} />
        <form autoComplete="off">
          {inventory.map((row: InventoryRow, i: number) => (
            <InventoryRowInput
              key={row.id}
              row={row}
              i={i}
              onInputChange={updateItemField}
              onDeleteClick={removeRow}
              removable={inventory.length > 1}
            />
          ))}
        </form>
        <Grid container direction="row-reverse">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="right">
              Total: ${totalPrice}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Exercise2;
