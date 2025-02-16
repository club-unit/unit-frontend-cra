export interface Profile {
  name: string;
  branch: Branch;
  rank: string;
  responsibility: string;
  profilePhoto: string;
}

export interface ProfileDetail extends Profile {
  sex: Sex;
  generation: Generation;
  activityTerm: number;
  badges: Badge[];
  email: string;
  isLeaved: boolean;
  joinedDatetime: string;
}

export interface MyProfile extends ProfileDetail {
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
