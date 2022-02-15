import { useMemo } from "react";
import {
  fetchRaces,
  updateCurrentTime,
  updateCategoryFilter,
  RacesState,
} from "../redux/racesSlice";
import { useAppDispatch } from "./redux";

export const useRace = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      loadRaces: () => dispatch(fetchRaces()),
      updateTime: (currentTime: number) =>
        dispatch(updateCurrentTime(currentTime)),
      updateFilter: (filter: Partial<RacesState["categoryFilter"]>) =>
        dispatch(updateCategoryFilter(filter)),
    }),
    [dispatch]
  );
};
