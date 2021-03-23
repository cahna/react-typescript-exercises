import { FC } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}));

const Exercise2: FC<{}> = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography>
        Discuss performance considerations in creating large forms with complex
        validation logic in React.
      </Typography>
    </Paper>
  );
};

export default Exercise2;
