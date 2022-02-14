import { useMemo } from "react";
import { fetchRaces } from "../redux/racesSlice";
import { useAppDispatch } from "./redux";

export const useRace = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      loadRaces: () => dispatch(fetchRaces()),
    }),
    [dispatch]
  );
};
