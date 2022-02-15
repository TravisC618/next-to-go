import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRaces } from "../api/races";
import { Race, RacingTypes } from "../types/race";
import { RootState } from "./store";
import { getNextRaces, getOutdatedIds, sortRacesByStart } from "../utils/races";
import { RACING_CATEGORIES } from "../constants/races";

interface FetchRacesConfig {
  count?: number;
  hiddentFetch?: boolean;
}

export const fetchRaces = createAsyncThunk<
  Race[],
  FetchRacesConfig | undefined
>("races/getRaces", async (options, { dispatch, rejectWithValue }) => {
  const { count = 10, hiddentFetch = false } = options || {};
  try {
    const response = await getRaces(count);
    const { race_summaries = {} } = response?.data?.data || {};
    const races = Object.values(race_summaries);
    return races;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export interface RacesState {
  races: Race[];
  nextFiveRaces: Race[];
  loadingRaces: boolean;
  loadingRacesError: string | undefined;
  currentTimeInMills: number;
  categoryFilter: Record<RacingTypes, boolean>;
}

const initialFilter: Record<RacingTypes, boolean> = {
  greyhound: true,
  harness: true,
  horse: true,
};

const initialState: RacesState = {
  races: [],
  nextFiveRaces: [],
  loadingRaces: true,
  loadingRacesError: undefined,
  currentTimeInMills: Date.now(),
  categoryFilter: initialFilter,
};

export const racesSlice = createSlice({
  name: "races",
  initialState,
  reducers: {
    updateNextFiveRaces: (state, action: PayloadAction<Race[]>) => {
      const races = sortRacesByStart(action.payload);
      state.nextFiveRaces = getNextRaces(races, 5);
    },
    updateCategoryFilter: (
      state,
      action: PayloadAction<Partial<RacesState["categoryFilter"]>>
    ) => {
      // ensure at least one filter selected
      const input: Record<RacingTypes, boolean> = {
        ...state.categoryFilter,
        ...action.payload,
      };
      const noSelect = !Object.values(input).some((isSelected) => isSelected);
      const toUpdateFilter = noSelect ? initialFilter : input;

      // get filtered races
      const filteredKeys = (
        Object.entries(toUpdateFilter) as [RacingTypes, boolean][]
      ).reduce(
        (keys: RacingTypes[], [categoryKey, isFilter]) =>
          isFilter ? [...keys, categoryKey] : keys,
        []
      );
      const categoryIds = filteredKeys.map((key) => RACING_CATEGORIES[key]);
      const filteredRaces = state.races.filter((race) =>
        categoryIds.includes(race.category_id)
      );

      state.nextFiveRaces = getNextRaces(sortRacesByStart(filteredRaces), 5);
      state.categoryFilter = toUpdateFilter;
    },
    updateCurrentTime: (state, action: PayloadAction<number>) => {
      const now = action.payload;
      state.currentTimeInMills = now;

      // check if any race has started a min
      const outdatedIds = getOutdatedIds(state.nextFiveRaces, now);

      // update next races and absort outdated races in current race list
      const totalAbort = outdatedIds.length;
      if (totalAbort) {
        state.nextFiveRaces = state.races.slice(totalAbort, 5 + totalAbort);
        state.races.splice(0, totalAbort);
      }
    },
  },
  // for reducing asyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchRaces.pending, (state) => {
        state.loadingRaces = true;
      })
      .addCase(fetchRaces.rejected, (state, action) => {
        state.loadingRacesError = action.error.message;
        state.loadingRaces = false;
      })
      .addCase(fetchRaces.fulfilled, (state, action) => {
        const races = sortRacesByStart(action.payload);
        const nextFiveRaces = getNextRaces(races, 5);
        return {
          ...state,
          races,
          nextFiveRaces,
          loadingRaces: false,
        };
      });
  },
});

export const { updateNextFiveRaces, updateCurrentTime, updateCategoryFilter } =
  racesSlice.actions;

export const selectNextFiveRacesState = (state: RootState) => ({
  races: state.races.nextFiveRaces,
  loading: state.races.loadingRaces,
  error: state.races.loadingRacesError,
});

export default racesSlice.reducer;
