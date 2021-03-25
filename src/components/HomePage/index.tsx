import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

import WorkItem from "components/WorkItemCard";

const useStyles = makeStyles({
  rowItem: {
    display: "flex"
  }
});

const HomePage: FC<{}> = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sm={6} className={classes.rowItem}>
        <WorkItem
          title="Exercise 1"
          header="React Hooks"
          subheader="XHR with public Gitlab API"
          content="Refactor class component(s) into functions with hooks."
          actions={
            <Button
              color="primary"
              variant="contained"
              component={RouterLink}
              to="/exercises/1"
            >
              View Exercise 1
            </Button>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.rowItem}>
        <WorkItem
          title="Exercise 2"
          header="React Performance"
          subheader="Enhance user experience"
          content="Fix responsiveness bugs in a large form with validation logic."
          actions={
            <Button
              color="primary"
              variant="contained"
              component={RouterLink}
              to="/exercises/2"
            >
              View Exercise 2
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
