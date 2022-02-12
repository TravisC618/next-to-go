import { render, screen } from "@testing-library/react";
import Header from "../../components/racingTable/Header";

describe("Racing Table Header", () => {
  it("renders cells", () => {
    render(<Header />);
    const meetingCellElement = screen.getByText("Meeting");
    const raceCellElement = screen.getByText("Race");
    const startInCellElement = screen.getByText("Start in");

    expect(meetingCellElement).toBeInTheDocument();
    expect(raceCellElement).toBeInTheDocument();
    expect(startInCellElement).toBeInTheDocument();
  });
});
