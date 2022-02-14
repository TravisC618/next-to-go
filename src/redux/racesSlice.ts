import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRaces } from "../api/races";
import { Race, RaceRowElement } from "../types/race";
import { RootState } from "./store";
import { getNextRaces, normalisedRaceRowElements } from "../utils/races";

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
  nextFiveRaces: RaceRowElement[];
  loadingRaces: boolean;
  loadingRacesError: string | undefined;
}

const initialState: RacesState = {
  races: [],
  nextFiveRaces: [],
  loadingRaces: false,
  loadingRacesError: undefined,
};

export const racesSlice = createSlice({
  name: "races",
  initialState,
  reducers: {},
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
        const races = action.payload;
        const nextFiveRaces: RaceRowElement[] = normalisedRaceRowElements(
          getNextRaces(races, 5)
        );
        return {
          ...state,
          races,
          nextFiveRaces,
          loadingRaces: false,
        };
      });
  },
});

export const selectNextFiveRacesState = (state: RootState) => ({
  races: state.races.nextFiveRaces,
  loading: state.races.loadingRaces,
  error: state.races.loadingRacesError,
});

export default racesSlice.reducer;
