import { FC } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { InventoryRow, InventoryItem } from "./types";
import { useStyles } from "./styles";

export interface Props {
  row: InventoryRow;
  i: number;
  removable?: boolean;
  onInputChange: (
    rowId: string,
    fieldName: keyof InventoryItem,
    value: InventoryItem[typeof fieldName],
    parse?: (v: any) => InventoryItem[typeof fieldName]
  ) => void;
  onDeleteClick: (rowId: string) => void;
}

const InventoryRowInput: FC<Props> = ({
  row,
  i,
  removable = true,
  onInputChange = () => {},
  onDeleteClick = () => {}
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.row}>
      <Grid item xs={12} sm={2}>
        <TextField
          id={`barcode-${i}`}
          label="Barcode"
          value={row.item.barcode}
          error={!!row.validationErrors?.barcode}
          helperText={row.validationErrors?.barcode}
          variant="outlined"
          size="small"
          onChange={(e) => onInputChange(row.id, "barcode", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          id={`name-${i}`}
          label="Name"
          value={row.item.name}
          error={!!row.validationErrors?.name}
          helperText={row.validationErrors?.name}
          size="small"
          variant="outlined"
          onChange={(e) => onInputChange(row.id, "name", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="number"
          id={`count-${i}`}
          label="Count"
          value={row.item.count}
          error={!!row.validationErrors?.count}
          helperText={row.validationErrors?.count}
          size="small"
          variant="outlined"
          onChange={(e) =>
            onInputChange(row.id, "count", e.target.value, parseFloat)
          }
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          type="number"
          id={`price-${i}`}
          label="Unit price"
          value={row.item.price}
          error={!!row.validationErrors?.price}
          helperText={row.validationErrors?.price}
          size="small"
          variant="outlined"
          onChange={(e) =>
            onInputChange(row.id, "price", e.target.value, parseFloat)
          }
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          disabled
          type="number"
          id={`total-${i}`}
          label="Total"
          value={row.item.count * row.item.price}
          size="small"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <IconButton
          aria-label="delete"
          color="secondary"
          size="small"
          disabled={!removable}
          onClick={() => onDeleteClick(row.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default InventoryRowInput;
