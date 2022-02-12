export interface IRaceData {
  race_id: string;
  category_id: string;
  meeting_name: string;
  race_number: number;
  advertised_start: {
    seconds: string;
  };
}

export interface IRaceTableEl {
  raceId: IRaceData["race_id"];
  meetingName: IRaceData["meeting_name"];
  raceNum: IRaceData["race_number"];
  start: IRaceData["advertised_start"]["seconds"];
}
