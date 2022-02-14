export type Race = {
  race_id: string;
  category_id: string;
  meeting_name: string;
  race_number: number;
  advertised_start: {
    seconds: number;
  };
};

export type RaceRowElement = {
  raceId: Race["race_id"];
  meetingName: Race["meeting_name"];
  raceNum: Race["race_number"];
  start: Race["advertised_start"]["seconds"];
};

type RaceData = {
  next_to_go_ids: Race["race_id"][];
  race_summaries: Record<Race["race_id"], Race>;
};

export type RaceResponse = {
  data: RaceData;
};
