import { ProfileDetail } from "@/types/api/profile";

export interface User {
  id: string;
  username: string;
  profile: ProfileDetail;
}
