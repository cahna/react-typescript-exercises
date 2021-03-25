import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";

import { IGithubClient, GithubClientContext } from "components/GithubClient";

import { GithubRepo } from "../types";
import Exercise1 from "../index";

const MOCK_REPOS: GithubRepo[] = [
  {
    id: 2325298,
    name: "linux",
    description: "Linux kernel source tree",
    fullName: "torvalds/linux",
    htmlUrl: "https://github.com/torvalds/linux"
  },
  {
    id: 79171906,
    name: "libdc-for-dirk",
    description: "Only use for syncing with Dirk",
    fullName: "torvalds/libdc-for-dirk",
    htmlUrl: "https://github.com/torvalds/libdc-for-dirk"
  }
];

const makeMockClient = (): IGithubClient => ({
  getRepos: jest.fn(() =>
    Promise.resolve({
      data: MOCK_REPOS
    } as AxiosResponse<GithubRepo[]>)
  )
});

describe("<Exercise1 />", () => {
  const setupTest = (mockClient: IGithubClient) =>
    render(
      <GithubClientContext.Provider value={mockClient}>
        <Exercise1 />
      </GithubClientContext.Provider>
    );

  describe("defaults", () => {
    it("displays username input", () => {
      const client = makeMockClient();
      const { getByRole } = setupTest(client);
      const input = getByRole("textbox", { name: /github username input/i });
      expect(input).toBeVisible();
      expect(input).toHaveTextContent("");
      expect(input).toBeEnabled();
      expect(client.getRepos).not.toHaveBeenCalled();
    });

    it("disables search button for empty input", () => {
      const client = makeMockClient();
      const { getByRole } = setupTest(client);
      const button = getByRole("button", { name: /search/i });
      expect(button).toBeVisible();
      expect(button).toBeDisabled();
      expect(client.getRepos).not.toHaveBeenCalled();
    });

    it("does not show table of repositories", () => {
      const client = makeMockClient();
      const { queryByRole } = setupTest(client);
      expect(queryByRole("table")).toBeNull();
    });
  });

  describe("valid usage", () => {
    it("shows repositories for valid username input", async () => {
      const client = makeMockClient();
      const { getByRole, getAllByRole } = setupTest(client);
      const input = getByRole("textbox", { name: /github username input/i });
      await userEvent.type(input, "torvalds", { delay: 0.01 });
      expect(client.getRepos).not.toHaveBeenCalled();

      const button = getByRole("button", { name: /search/i });
      expect(button).toBeEnabled();
      userEvent.click(button);

      await waitFor(() => expect(getByRole("table")).toBeVisible());
      expect(getAllByRole("row")).toHaveLength(MOCK_REPOS.length + 1);
      expect(client.getRepos).toHaveBeenCalledTimes(1);
    });
  });
});
