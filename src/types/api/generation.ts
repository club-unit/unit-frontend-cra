export interface Generation {
  id: number;
  number: number;
  year: number;
  semester: number;
  startDate: string | null;
  endDate: string | null;
  leader: number | null;
  description: string;
}
