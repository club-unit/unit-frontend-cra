export interface Profile {
  name: string;
  branch: Branch;
  rank: string;
  responsibility: string;
  profilePhoto: string;
  sex: Sex;
  generation: Generation;
  activityTerm: number;
  badges: Badge[];
  email: string;
  isLeaved: boolean;
  joinedDatetime: string;
}

export interface OtherProfile extends Profile {}

export interface ProfileDetail extends Profile {
  phoneNumber: string;
  birthDate: string;
}

export type Branch = "GREEN" | "DONGA" | "CITY" | "UNION" | "JAMSIL" | "JUNGSAN";

export type Rank = "NONE" | "NEW" | "ASSOCIATED" | "REGULAR" | "OB";

export type Sex = "M" | "F";

export interface Generation {
  id: number;
  number: number;
  year: number;
  semester: number;
  description: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  image: string;
}
