/**
 * [Instructions]
 * - Make the "name" fields a link to the corresponding repository
 *
 * [Bonus]
 * - Add client-side pagination to table
 * - Add server-side pagination to table
 */

import { FC } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { GithubRepo } from "./types";

const RepoList: FC<{ data?: GithubRepo[] | null }> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, name, description }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RepoList;
