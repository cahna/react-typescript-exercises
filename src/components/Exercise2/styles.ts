import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  row: {
    marginBottom: theme.spacing(1),
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover
    }
  },
  divider: {
    margin: theme.spacing(1)
  }
}));
