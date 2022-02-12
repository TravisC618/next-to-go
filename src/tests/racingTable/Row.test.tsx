import { render, screen } from "@testing-library/react";
import { Row } from "../../components/racingTable/Row";
import { IRaceTableEl } from "../../types/race";

describe("Racing Table Row", () => {
  it("should renders same data passed into raceData prop", () => {
    const raceData: IRaceTableEl = {
      raceId: "test-id",
      meetingName: "Ipswich",
      raceNum: 5,
      start: "1644663900",
    };
    render(<Row raceData={raceData} />);

    const meetingCellElement = screen.getByRole("cell", {
      name: raceData.meetingName,
    });
    const raceNumCellElement = screen.getByRole("cell", {
      name: `R${raceData.raceNum}`,
    });
    const startCellElement = screen.getByRole("cell", {
      name: raceData.start,
    });

    expect(meetingCellElement).toBeInTheDocument();
    expect(raceNumCellElement).toBeInTheDocument();
    expect(startCellElement).toBeInTheDocument();
  });
});
