import { Race, RaceRowElement } from "../types/race";

/** compare races by advertised start time */
const compareStartTime = (firstRace: Race, secondRace: Race) =>
  firstRace.advertised_start.seconds - secondRace.advertised_start.seconds;

/** return races sorted by time ascending */
const sortRacesByStart = (races: Race[]) => races?.sort(compareStartTime);

export const getNextRaces = (races: Race[], number: number) =>
  sortRacesByStart(races)?.slice(0, number);

export const normalisedRaceRowElements = (races: Race[]): RaceRowElement[] =>
  races.map((race) => ({
    raceId: race["race_id"],
    raceNum: race["race_number"],
    meetingName: race["meeting_name"],
    start: race["advertised_start"].seconds,
  }));
