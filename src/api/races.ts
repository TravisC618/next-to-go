import { RaceResponse } from "../types/race";
import request from "./request";

const RACING_URL = "/racing/";

export const getRaces = (method = "nextraces", count = 10) =>
  request<RaceResponse>({
    url: RACING_URL,
    params: {
      method,
      count,
    },
  });
