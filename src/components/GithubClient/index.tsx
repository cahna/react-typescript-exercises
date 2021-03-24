import {
  FC,
  useMemo,
  createContext,
  PropsWithChildren,
  useContext,
  ComponentType
} from "react";
import { Subtract } from "utility-types";
import axios, { AxiosResponse } from "axios";
import applyConverters from "axios-case-converter";

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  fullName: string;
  htmlUrl: string;
}

export interface IGithubClient {
  getRepos: (username: string) => Promise<AxiosResponse<GithubRepo[]>>;
}

export const GithubClientContext = createContext<IGithubClient>({
  getRepos: () => {
    throw Error("Provider missing for Github client");
  }
});

/**
 * Hook-based access to githubClient
 */
export const useGithubClient = () => useContext(GithubClientContext);

export interface InjectedContext {
  githubClient: IGithubClient;
}

/**
 * Higher-order component to inject "githubClient" prop
 */
export const withGithubClient = <P extends InjectedContext>(
  Component: ComponentType<P>
) => {
  const Wrapped: FC<Subtract<P, InjectedContext>> = (props) => (
    <GithubClientContext.Consumer>
      {(context) => <Component {...(props as P)} githubClient={context} />}
    </GithubClientContext.Consumer>
  );
  return Wrapped;
};

export const GithubClientProvider: FC<PropsWithChildren<{}>> = ({
  children
}) => {
  const githubClient = useMemo<IGithubClient>(() => {
    const client = applyConverters(
      axios.create({
        baseURL: "https://api.github.com/",
        headers: { "Content-Type": "application/json" }
      })
    );

    return {
      getRepos: (username) =>
        client.get<GithubRepo[]>(`users/${username}/repos`, {
          params: {
            type: "all",
            sort: "updated"
          }
        })
    };
  }, []);

  return (
    <GithubClientContext.Provider value={githubClient}>
      {children}
    </GithubClientContext.Provider>
  );
};
