import { FC } from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const NavBar: FC<{ name?: string }> = ({ name }) => {
  const classes = useStyles();
  const renderName = name ? `: ${name}` : null;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar role="navigation">
          <IconButton
            component={Link}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React Interview{renderName}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
