import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Race } from "../../types/race";
import dayjs from "dayjs";
import { START_INDICATOR } from "../../constants/races";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { getDiffInMills } from "../../utils/races";

interface RowProps {
  race: Race;
}

export const Row: React.FC<RowProps> = ({ race }) => {
  const currentTime = useAppSelector(
    (state: RootState) => state.races.currentTimeInMills
  );

  const {
    meeting_name,
    race_number,
    advertised_start: { seconds: startTime },
  } = race;

  const diff = getDiffInMills(startTime, currentTime);
  const timeLeft = dayjs(diff).format("m:ss");

  return (
    <TableRow>
      <TableCell>{meeting_name}</TableCell>
      <TableCell>{`R${race_number}`}</TableCell>
      <TableCell>{diff < 0 ? START_INDICATOR : timeLeft}</TableCell>
    </TableRow>
  );
};
