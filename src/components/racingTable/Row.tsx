import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { IRaceTableEl } from "../../types/race";

interface RowProps {
  raceData: IRaceTableEl;
}

export const Row: React.FC<RowProps> = ({ raceData }) => {
  const { meetingName, raceNum, start } = raceData;
  return (
    <TableRow>
      <TableCell>{meetingName}</TableCell>
      <TableCell>{`R${raceNum}`}</TableCell>
      <TableCell>{start}</TableCell>
    </TableRow>
  );
};
