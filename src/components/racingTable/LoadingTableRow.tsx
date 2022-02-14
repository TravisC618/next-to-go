import { TableRow, TableCell } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const createEmptyArray = (size: number) => Array(size).fill("");

export const LoadingTableRow: React.FC = () => {
  return (
    <>
      {createEmptyArray(5).map((_, rowIndex) => (
        <TableRow
          key={`loading-table-row-${rowIndex}`}
          data-testid="loading-block"
        >
          {createEmptyArray(3).map((_, cellIndex) => (
            <TableCell key={`loading-table-cell-${cellIndex}`}>
              <Skeleton variant="rect" width={210} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
