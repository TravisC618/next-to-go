import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as racesAPI from "../../api/races";
import { fetchRaces, RacesState } from "../../redux/racesSlice";
import { RaceResponse } from "../../types/race";
import { races } from "../fixtures/races";

const mockStore = configureStore([thunk]);

const initState: RacesState = {
  races: [],
  nextFiveRaces: [],
  loadingRaces: false,
  loadingRacesError: undefined,
  currentTimeInMills: Date.now(),
  lastFetchAt: Date.now(),
  categoryFilter: {
    greyhound: true,
    harness: true,
    horse: true,
  },
};

// HACK: jest.mock is not allowed to reference any out-of-scope variables
const racesFixture = () => races;

jest.mock("../../api/races");

describe("Races Slice", () => {
  let api: jest.Mocked<typeof racesAPI>;

  beforeAll(() => {
    api = racesAPI as any;
    api.getRaces.mockClear();
  });

  afterAll(() => {
    jest.unmock("../../api/races");
  });

  it("initialise slice store", () => {
    const store = mockStore(initState);
    const result = store.getState();
    expect(result).toBe(initState);
  });

  it("should call the api success", async () => {
    (api.getRaces as any).mockResolvedValue(
      Promise.resolve<{ data: RaceResponse }>({ data: racesFixture() })
    );

    const store = mockStore(initState);
    const response = await store.dispatch<any>(fetchRaces());
    const [_, fulfilledAction] = store.getActions();
    const expected = Object.values(racesFixture().data.race_summaries);
    expect(response.meta.requestStatus).toBe("fulfilled");
    expect(fulfilledAction.payload).toStrictEqual(expected);
  });

  it("should reject if the api failed", async () => {
    const error = { message: "api failed" };
    api.getRaces.mockRejectedValue(error);

    const store = mockStore(initState);
    const response = await store.dispatch<any>(fetchRaces());
    const [_, rejectedAction] = store.getActions();
    expect(response.meta.requestStatus).toBe("rejected");
    expect(rejectedAction.payload).toStrictEqual(error);
  });
});
