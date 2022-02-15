import { render, screen } from "@testing-library/react";
import RacingTableHead from "../../components/racingTable/RacingTableHead";

describe("Racing Table Head", () => {
  it("renders cells", () => {
    render(<RacingTableHead />);
    const meetingCellElement = screen.getByText("Meeting");
    const raceCellElement = screen.getByText("Race");
    const startInCellElement = screen.getByText("Start in");

    expect(meetingCellElement).toBeInTheDocument();
    expect(raceCellElement).toBeInTheDocument();
    expect(startInCellElement).toBeInTheDocument();
  });
});
