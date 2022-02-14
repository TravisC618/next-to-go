import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { RaceRowElement } from "../../types/race";

interface RowProps {
  race: RaceRowElement;
}

export const Row: React.FC<RowProps> = ({ race }) => {
  const { meetingName, raceNum, start } = race;
  return (
    <TableRow>
      <TableCell>{meetingName}</TableCell>
      <TableCell>{`R${raceNum}`}</TableCell>
      <TableCell>{start}</TableCell>
    </TableRow>
  );
};
