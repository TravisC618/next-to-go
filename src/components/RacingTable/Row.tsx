import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell } from "@material-ui/core";
import { Race } from "../../types/race";
import dayjs from "dayjs";
import { START_INDICATOR } from "../../constants/races";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { getDiffInMills } from "../../utils/races";

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      "& .MuiTableCell-root": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
  })
);

interface RowProps {
  race: Race;
}

export const Row: React.FC<RowProps> = ({ race }) => {
  const classes = useStyles();

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
    <TableRow className={classes.row}>
      <TableCell>{meeting_name}</TableCell>
      <TableCell align="right">{`R${race_number}`}</TableCell>
      <TableCell align="right">
        {diff < 0 ? START_INDICATOR : timeLeft}
      </TableCell>
    </TableRow>
  );
};
