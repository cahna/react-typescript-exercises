import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import NavBar from "components/NavBar";
import Home from "components/HomePage";
import Exercise1 from "components/Exercise1";
import Exercise2 from "components/Exercise2";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(2)
  }
}));

const App: FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <Router>
        <NavBar name="Welcome!" />
        <div className={classes.page}>
          <Grid container item>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/exercises/1" component={Exercise1} />
              <Route exact path="/exercises/2" component={Exercise2} />
              <Route render={() => <pre>Error: 404</pre>} />
            </Switch>
          </Grid>
        </div>
      </Router>
    </div>
  );
};

export default App;
