import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Header from "./Header";
import { Row } from "./Row";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { LoadingTableRow } from "./LoadingTableRow";
import { RaceRowElement } from "../../types/race";
import { selectNextFiveRacesState } from "../../redux/racesSlice";
import { useAppSelector, useRace } from "../../hooks";

export const RacingTable: React.FC = () => {
  const { races, loading, error } = useAppSelector(selectNextFiveRacesState);
  console.log("error: ", error);
  const { loadRaces } = useRace();

  useEffect(() => {
    loadRaces();
  }, [loadRaces]);

  return (
    <TableContainer component={Paper}>
      {error && <ErrorAlert error={error} />}
      <Table>
        <Header />
        <TableBody>
          {loading ? (
            <LoadingTableRow />
          ) : (
            races?.map((race: RaceRowElement) => (
              <Row key={race.raceId} race={race} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
