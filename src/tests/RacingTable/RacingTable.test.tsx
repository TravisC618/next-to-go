import React from "react";
import * as racesAPI from "../../api/races";
import { render, screen } from "../utils/renderWithRedux";
import { races } from "../fixtures/races";
import { RacingTable } from "../../components/RacingTable/RacingTable";
import { RaceResponse } from "../../types/race";

// HACK: jest.mock is not allowed to reference any out-of-scope variables
const racesFixture = () => races;

jest.mock("../../api/races");

describe("Racing Table", () => {
  let api: jest.Mocked<typeof racesAPI>;

  beforeAll(() => {
    api = racesAPI as any;
    api.getRaces.mockClear();
  });
  afterEach(() => api.getRaces.mockRestore());
  afterAll(() => jest.unmock("../../api/races"));

  it("should render races if fetch successfully", async () => {
    (api.getRaces as any).mockResolvedValue(
      Promise.resolve<{ data: RaceResponse }>({ data: racesFixture() })
    );
    render(<RacingTable />);

    Object.values(races.data.race_summaries).forEach(async (race) => {
      expect(await screen.getByText(race.meeting_name)).toBeInTheDocument();
    });
  });
  it("should render skeleton if fetch loading", () => {
    render(<RacingTable />);
    const loadingBlocks = screen.getAllByTestId("loading-block");
    expect(loadingBlocks).toHaveLength(5);
  });
});
