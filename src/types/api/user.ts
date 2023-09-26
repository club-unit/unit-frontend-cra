import { ProfileDetail } from "src/types/api/profile";

export interface User {
  id: number;
  username: string;
  profile: ProfileDetail;
}
