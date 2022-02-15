import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

const RacingTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Meeting</TableCell>
        <TableCell align="right">Race</TableCell>
        <TableCell align="right">Start in</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default React.memo(RacingTableHead);
