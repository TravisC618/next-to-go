import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RacingTableHead from "./RacingTableHead";
import { Row } from "./Row";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { LoadingTableRow } from "./LoadingTableRow";
import { selectNextFiveRacesState } from "../../redux/racesSlice";
import { useAppSelector, useInterval, useRace } from "../../hooks";
import { MenuBar } from "./MenuBar";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "780px",
      margin: "auto",
      flex: 1,
    },
    table: {
      tableLayout: "fixed",
    },
  })
);

export const RacingTable: React.FC = () => {
  // styling
  const classes = useStyles();

  // race handlers
  const { races, loading, error } = useAppSelector(selectNextFiveRacesState);
  const { loadRaces, updateTime } = useRace();

  useEffect(() => {
    loadRaces();
  }, [loadRaces]);

  useInterval(() => {
    updateTime(Date.now());
  }, []);

  return (
    <Paper className={classes.root}>
      <MenuBar />
      <TableContainer component={Paper}>
        {error && <ErrorAlert error={error} />}
        <Table className={classes.table}>
          <RacingTableHead />
          <TableBody>
            {loading ? (
              <LoadingTableRow />
            ) : (
              races?.map((race) => <Row key={race["race_id"]} race={race} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
