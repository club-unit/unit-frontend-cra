import { MyProfile, ProfileDetail } from "src/types/api/profile";

export interface User {
  id: number;
  username: string;
  profile: MyProfile;
}

export interface OtherUser {
  id: number;
  username: string;
  profile: ProfileDetail;
}
