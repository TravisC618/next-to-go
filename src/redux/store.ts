import { configureStore } from "@reduxjs/toolkit";
import racesReducer from "./racesSlice";

export const store = configureStore({
  reducer: {
    races: racesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// e.g. Inferred type: { races: RacesState }
export type AppDispatch = typeof store.dispatch;
