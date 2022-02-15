import { OUTDATED_TIMING } from "../constants/races";
import { Race } from "../types/race";

/** compare races by advertised start time */
const compareStartTime = (firstRace: Race, secondRace: Race) =>
  firstRace.advertised_start.seconds - secondRace.advertised_start.seconds;

/** return races sorted by time ascending */
export const sortRacesByStart = (races: Race[]) =>
  races?.sort(compareStartTime);

export const getNextRaces = (races: Race[], number: number) =>
  sortRacesByStart(races)?.slice(0, number);

/** get difference in milliseconds from now */
export const getDiffInMills = (
  time: Race["advertised_start"]["seconds"],
  now: number
) => time * 1000 - now;

/**
 * get outdated race ids - has started a min from now
 * @param races input races
 * @param now in millis
 * @returns outdated id array
 */
export const getOutdatedIds = (races: Race[], now: number) =>
  races.reduce((ids: Array<Race["race_id"]>, race) => {
    const diff = getDiffInMills(race.advertised_start.seconds, now);
    if (diff < OUTDATED_TIMING) {
      ids.push(race.race_id);
    }
    return ids;
  }, []);
