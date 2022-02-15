import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell } from "@material-ui/core";
import { Race } from "../../types/race";
import dayjs from "dayjs";
import { HIGHLIGHT_TIMING, START_INDICATOR } from "../../constants/races";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { getDiffInMills } from "../../utils/races";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      "& .MuiTableCell-root": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
    highlight: {
      color: red[600],
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

  const highlight = diff < HIGHLIGHT_TIMING;

  const timeLeft = highlight
    ? dayjs(diff).format("m:ss")
    : dayjs(diff).format("m") + "m";

  return (
    <TableRow className={classes.row}>
      <TableCell>{meeting_name}</TableCell>
      <TableCell align="right">{`R${race_number}`}</TableCell>
      <TableCell className={highlight ? classes.highlight : ""} align="right">
        {diff < 0 ? START_INDICATOR : timeLeft}
      </TableCell>
    </TableRow>
  );
};
