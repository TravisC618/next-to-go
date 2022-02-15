import { useMemo } from "react";
import {
  fetchRaces,
  updateCurrentTime,
  updateNextFiveRaces,
} from "../redux/racesSlice";
import { Race } from "../types/race";
import { useAppDispatch } from "./redux";

export const useRace = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      loadRaces: () => dispatch(fetchRaces()),
      updateTime: (currentTime: number) =>
        dispatch(updateCurrentTime(currentTime)),
      updateNextRaces: (races: Race[]) => dispatch(updateNextFiveRaces(races)),
    }),
    [dispatch]
  );
};
