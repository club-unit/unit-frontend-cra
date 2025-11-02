export interface Profile {
  id: number;
  name: string;
  profilePhoto: string;
  branch: Branch;
  responsibility: Responsibility;
  rank: Rank;
}

export interface AuthorProfile {
  name: string;
  profilePhoto: string;
  branch: Branch;
  rank: Rank;
  responsibility: Responsibility;
}

export interface OtherProfile extends Profile {
  generation: Generation;
  badges: Badge[];
  sex: Sex;
  email: string;
  activityTerm: number;
  isLeaved: boolean;
  joinedDatetime: string;
}

export interface MyProfile extends OtherProfile {
  phoneNumber: string;
  birthDate: string;
}

export type Branch = "GREEN" | "DONGA" | "CITY" | "UNION" | "JAMSIL" | "JUNGSAN";

export type Rank = "NONE" | "NEW" | "ASSOCIATED" | "REGULAR" | "OB";

export type Sex = "M" | "F";

export type Responsibility =
  | "NONE"
  | "NORMAL"
  | "BRANCH_STAFF"
  | "BRANCH_LEADER"
  | "CLUB_STAFF"
  | "CLUB_LEADER";

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
