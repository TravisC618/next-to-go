import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Header from "./Header";
import { IRaceTableEl } from "../../types/race";
import { Row } from "./Row";

const fakeRaceSummaries: Record<string, IRaceTableEl> = {
  id1: { raceId: "id1", meetingName: "Geelong", raceNum: 2, start: "159" },
  id2: { raceId: "id2", meetingName: "Ipswich", raceNum: 4, start: "237" },
  id3: { raceId: "id3", meetingName: "Melton", raceNum: 3, start: "262" },
  id4: { raceId: "id4", meetingName: "Toowoomba", raceNum: 6, start: "305" },
  id5: {
    raceId: "id5",
    meetingName: "Harlow Bags",
    raceNum: 13,
    start: "356",
  },
};

export const RacingTable: React.FC = () => {
  const raceDataSet = Object.values(fakeRaceSummaries);
  return (
    <TableContainer component={Paper}>
      <Table>
        <Header />
        <TableBody>
          {raceDataSet.map((raceData: IRaceTableEl) => (
            <Row key={raceData.raceId} raceData={raceData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
