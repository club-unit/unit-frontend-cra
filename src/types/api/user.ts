import { MyProfile, OtherProfile } from "src/types/api/profile";

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
