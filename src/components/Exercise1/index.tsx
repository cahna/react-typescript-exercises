/**
 * [Instructions]
 * Refactor this React.Component class into a functional component
 * that uses the React Hooks API.
 *
 * [Bonus]
 * 1. Refactor promises to use async/await
 * 2. Clear the list of repositories when the username changes or is cleared
 * 3. Choice of:
 *   a. Automatically fetch repositories when input changes
 *     - Be sure to handle errors
 *     - Add debouncing
 *   b. Autocomplete available usernames
 *     - Lookup username API from Github
 *     - Add windowing to paginated list of results
 *
 * [Questions]
 * 1. What are the implication differences between the following import methods? Which import method is preferable? Why?
 *   import { Paper } from "@material-ui/core";
 *   import Paper from "@material-ui/core/Paper";
 */

import { Component, SyntheticEvent, ChangeEvent } from "react";
import { IconButton, Paper, InputBase } from "@material-ui/core";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";

import { withGithubClient, InjectedContext } from "components/GithubClient";

import RepoList from "./RepoList";
import { GithubRepo } from "./types";

interface Exercise1Props extends InjectedContext {
  classes: Record<string, string>;
}
interface Exercise1State {
  username: string;
  loading: boolean;
  data: GithubRepo[] | null;
}

class Exercise1 extends Component<Exercise1Props, Exercise1State> {
  constructor(props: Exercise1Props) {
    super(props);
    this.state = {
      username: "",
      loading: false,
      data: null
    };
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.githubClient.getRepos(this.state.username).then(({ data }) => {
      this.setState({
        loading: false,
        data
      });
    });
  };

  updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const inputIsEmpty = !this.state.username;
    const githubData = this.state.data ? (
      <RepoList data={this.state.data} />
    ) : null;

    return (
      <div className={classes.root}>
        <Paper
          component="form"
          className={classes.inputRoot}
          onSubmit={this.handleSubmit}
        >
          <GitHubIcon />
          <InputBase
            className={classes.input}
            placeholder="Github Username"
            inputProps={{ "aria-label": "Github username input" }}
            value={this.state.username}
            onChange={this.updateUsername}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            disabled={inputIsEmpty}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        {githubData}
      </div>
    );
  }
}

const styles = (theme: Theme) =>
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
    },
    divider: {
      height: 28,
      margin: 4
    }
  });

// [Question] What is the React term for wrapping a component like this?
export default withGithubClient(withStyles(styles)(Exercise1));
