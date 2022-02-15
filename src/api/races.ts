import { RaceResponse } from "../types/race";
import request from "./request";

const RACING_URL = "/racing/";

export const getRaces = (count = 10) =>
  request<RaceResponse>({
    url: RACING_URL,
    params: {
      method: "nextraces",
      count,
    },
  });
