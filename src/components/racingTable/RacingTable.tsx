import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import RacingTableHead from "./RacingTableHead";
import { Row } from "./Row";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { LoadingTableRow } from "./LoadingTableRow";
import { selectNextFiveRacesState } from "../../redux/racesSlice";
import { useAppSelector, useInterval, useRace } from "../../hooks";
import { MenuBar } from "./MenuBar";

export const RacingTable: React.FC = () => {
  const { races, loading, error } = useAppSelector(selectNextFiveRacesState);
  const { loadRaces, updateTime } = useRace();

  useEffect(() => {
    loadRaces();
  }, [loadRaces]);

  useInterval(() => {
    updateTime(Date.now());
  }, []);

  return (
    <Paper>
      <MenuBar />
      <TableContainer component={Paper}>
        {error && <ErrorAlert error={error} />}
        <Table>
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
