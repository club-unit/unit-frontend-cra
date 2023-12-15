import { OtherProfile, ProfileDetail } from "src/types/api/profile";

export interface User {
  id: number;
  username: string;
  profile: ProfileDetail;
}

export interface OtherUser {
  id: number;
  username: string;
  profile: OtherProfile;
}
