import { RacingTypes } from "../types/race";

export const START_INDICATOR = "NOW";

export const OUTDATED_TIMING = -60000; // 1 min

export const REFETCH_SESSION = 180000; // 3 mins

export const RACING_CATEGORIES: Record<RacingTypes, string> = {
  greyhound: "9daef0d7-bf3c-4f50-921d-8e818c60fe61",
  harness: "161d9be2-e909-4326-8c2c-35ed71fb460b",
  horse: "4a2788f8-e825-4d36-9894-efd4baf1cfae",
};
