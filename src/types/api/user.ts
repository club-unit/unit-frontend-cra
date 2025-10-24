import {
  MyProfile,
  OtherProfile,
  Generation,
  Branch,
  Responsibility,
  Rank,
} from "src/types/api/profile";

export interface MyUser {
  id: number;
  username: string;
  profile: MyProfile;
}

export interface OtherUser {
  id: number;
  username: string;
  profile: OtherProfile;
}

export interface UsersListProfile {
  name: string;
  profilePhoto: string;
  sex: string;
  yearAge: string;
  phoneNumber: string;
  birthDate: string;
  branch: Branch;
  responsibility: Responsibility;
  rank: Rank;
  activityTerm: number;
  joinedGeneration: Generation;
  isLeaved: boolean;
}

export interface UsersListUser {
  id: number;
  profile: UsersListProfile;
}
