export type Race = {
  race_id: string;
  category_id: string;
  meeting_name: string;
  race_number: number;
  advertised_start: {
    seconds: number;
  };
};

type RaceData = {
  next_to_go_ids: Race["race_id"][];
  race_summaries: Record<Race["race_id"], Race>;
};

export type RaceResponse = {
  data: RaceData;
};

export type RacingTypes = "greyhound" | "harness" | "horse";
