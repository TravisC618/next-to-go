import { MenuBar } from "../../components/RacingTable/MenuBar";
import { RACING_CATEGORIES } from "../../constants/races";
import { render, screen } from "../utils/renderWithRedux";

const categories = Object.keys(RACING_CATEGORIES);

describe("Racing Table Menu Bar", () => {
  it("should render correct categories in menu", () => {
    render(<MenuBar />);

    expect(
      screen.getByRole("button", {
        name: "Filter",
      })
    ).toBeInTheDocument();
    categories.forEach((category) => {
      const re = new RegExp(category, "gi");
      expect(screen.getByText(re)).toBeInTheDocument();
    });
    console.log("render", screen.debug());
  });
});
