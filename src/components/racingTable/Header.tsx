import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Meeting</TableCell>
        <TableCell>Race</TableCell>
        <TableCell>Start in</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default React.memo(Header);
