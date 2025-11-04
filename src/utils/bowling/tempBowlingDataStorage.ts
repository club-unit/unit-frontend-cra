import { Branch } from "src/types/api/profile";

export interface GameScore {
  participated: boolean;
  score: number;
}

export interface BowlingRow {
  key: string;
  memberId?: number;
  memberName?: string;
  games: GameScore[];
}

export interface TempBowlingData {
  individualScoreRows: BowlingRow[];
  selectedDate: string | null; // ISO string format
  selectedBranch?: Branch;
  savedAt: string; // ISO string format
}

export const TEMP_BOWLING_DATA_KEY = "bowling_temp_score_data";

/**
 * 임시 저장된 볼링 데이터가 존재하는지 확인합니다.
 * @returns 임시 데이터 존재 여부
 */
export const checkTempBowlingData = (): boolean => {
  const data = localStorage.getItem(TEMP_BOWLING_DATA_KEY);
  return !!data;
};

/**
 * 볼링 데이터를 localStorage에 임시 저장합니다.
 * @param data 저장할 볼링 데이터
 * @returns 성공 여부
 */
export const saveTempBowlingData = (data: Omit<TempBowlingData, "savedAt">): boolean => {
  try {
    const tempData: TempBowlingData = {
      ...data,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(TEMP_BOWLING_DATA_KEY, JSON.stringify(tempData));
    return true;
  } catch (error) {
    console.error("Failed to save temp bowling data:", error);
    return false;
  }
};

/**
 * localStorage에서 임시 저장된 볼링 데이터를 불러옵니다.
 * @returns 임시 저장된 볼링 데이터 또는 null
 */
export const loadTempBowlingData = (): TempBowlingData | null => {
  try {
    const data = localStorage.getItem(TEMP_BOWLING_DATA_KEY);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as TempBowlingData;
  } catch (error) {
    console.error("Failed to load temp bowling data:", error);
    return null;
  }
};

/**
 * localStorage에서 임시 저장된 볼링 데이터를 삭제합니다.
 */
export const clearTempBowlingData = (): void => {
  localStorage.removeItem(TEMP_BOWLING_DATA_KEY);
};
