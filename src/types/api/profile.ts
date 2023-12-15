export interface Profile {
  name: string;
  branch: Branch;
  rank: string;
  responsibility: string;
  profilePhoto: string;
}

export interface OtherProfile extends Profile {
  activityTerm: number;
  sex: number;
  generation: number;
}

export interface ProfileDetail extends Profile {
  phoneNumber: string;
  birthDate: string;
  activityTerm: number;
  sex: number;
  generation: number;
}

export type Branch = "GREEN" | "DONGA" | "CITY" | "UNION" | "JAMSIL" | "JUNGSAN";

export type Rank = "NONE" | "NEW" | "ASSOCIATED" | "REGULAR" | "OB";
