import { render, screen } from "../utils/renderWithRedux";
import { Row } from "../../components/racingTable/Row";
import { Race } from "../../types/race";
import { START_INDICATOR } from "../../constants/races";

const raceData: Race = {
  race_id: "test-id",
  meeting_name: "Ipswich",
  race_number: 5,
  advertised_start: {
    seconds: 1644663600, // 21:00
  },
  category_id: "123",
};

describe("Racing Table Row", () => {
  it("should render same data passed into raceData prop", () => {
    render(<Row race={raceData} />);

    const meetingCellElement = screen.getByRole("cell", {
      name: raceData.meeting_name,
    });
    const raceNumCellElement = screen.getByRole("cell", {
      name: `R${raceData.race_number}`,
    });

    expect(meetingCellElement).toBeInTheDocument();
    expect(raceNumCellElement).toBeInTheDocument();
  });

  it("should render correct time left if race has not start", () => {
    const currentTimeInMills = 1644663540000; // 20:59
    render(<Row race={raceData} />, {
      preloadedState: {
        races: {
          currentTimeInMills,
        },
      },
    });

    const startCellElement = screen.getByRole("cell", {
      name: "1:00",
    });
    expect(startCellElement).toBeInTheDocument();
  });

  it("should indicate race has started", () => {
    const currentTimeInMills = 1644663660000; // 21:51
    render(<Row race={raceData} />, {
      preloadedState: {
        races: {
          currentTimeInMills,
        },
      },
    });

    const startCellElement = screen.getByRole("cell", {
      name: START_INDICATOR,
    });
    expect(startCellElement).toBeInTheDocument();
  });
});
