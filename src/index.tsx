import { render } from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { GithubClientProvider } from "components/GithubClient";
import App from "components/App";

const theme = createMuiTheme();
const rootElement = document.getElementById("root");

render(
  <MuiThemeProvider theme={theme}>
    <GithubClientProvider>
      <App />
    </GithubClientProvider>
  </MuiThemeProvider>,
  rootElement
);
