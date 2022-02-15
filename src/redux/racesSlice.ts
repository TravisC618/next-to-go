import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRaces } from "../api/races";
import { Race } from "../types/race";
import { RootState } from "./store";
import { getDiffInMills, getNextRaces, sortRacesByStart } from "../utils/races";
import { OUTDATED_TIMING } from "../constants/races";

export const fetchRaces = createAsyncThunk(
  "races/getRaces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRaces();
      const { race_summaries = {} } = response?.data?.data || {};
      const races = Object.values(race_summaries);
      return races;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface RacesState {
  races: Race[];
  nextFiveRaces: Race[];
  loadingRaces: boolean;
  loadingRacesError: string | undefined;
  currentTimeInMills: number;
}

const initialState: RacesState = {
  races: [],
  nextFiveRaces: [],
  loadingRaces: false,
  loadingRacesError: undefined,
  currentTimeInMills: Date.now(),
};

export const racesSlice = createSlice({
  name: "races",
  initialState,
  reducers: {
    updateNextFiveRaces: (state, action: PayloadAction<Race[]>) => {
      state.nextFiveRaces = action.payload;
    },
    updateCurrentTime: (state, action: PayloadAction<number>) => {
      const now = action.payload;
      state.currentTimeInMills = now;

      // check if any race has started a min
      const outdatedIds = state.nextFiveRaces.reduce(
        (ids: Array<Race["race_id"]>, race) => {
          const diff = getDiffInMills(race.advertised_start.seconds, now);
          if (diff < OUTDATED_TIMING) {
            ids.push(race.race_id);
          }
          return ids;
        },
        []
      );

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
        const nextFiveRaces: Race[] = getNextRaces(races, 5);
        return {
          ...state,
          races,
          nextFiveRaces,
          loadingRaces: false,
        };
      });
  },
});

export const { updateNextFiveRaces, updateCurrentTime } = racesSlice.actions;

export const selectNextFiveRacesState = (state: RootState) => ({
  races: state.races.nextFiveRaces,
  loading: state.races.loadingRaces,
  error: state.races.loadingRacesError,
});

export default racesSlice.reducer;
