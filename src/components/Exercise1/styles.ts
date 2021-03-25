import { createStyles, Theme } from "@material-ui/core/styles";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    inputRoot: {
      padding: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(2)
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  });
