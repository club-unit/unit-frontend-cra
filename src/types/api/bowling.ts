import { BowlingRecordProfile } from "src/types/api/profile";

export interface PersonalBowlingRecord {
  id: number;
  profile: BowlingRecordProfile;
  rank: number;
  average: number;
  high: number;
  numGames: number;
  records: DailyBowlingRecord[];
}

export interface DailyBowlingRecord {
  date: string;
  games: BowlingGame[];
}

export interface BowlingGame {
  index: number;
  score: number;
}
