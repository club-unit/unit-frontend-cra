export interface Profile {
  name: string;
  branch: "GREEN" | "DONGA" | "CITY" | "UNION" | "JAMSIL" | "JUNGSAN";
  rank: string;
  responsibility: string;
}

export interface ProfileDetail extends Profile {
  phoneNumber: string;
  birthDate: string;
  activityTerm: number;
}
