import { Rank } from "@/types/api/profile";

export const RANK_LOOKUP_TABLE: Record<Rank, string> = {
  NONE: "비회원",
  NEW: "신입",
  ASSOCIATED: "준회원",
  REGULAR: "정회원",
  OB: "OB",
};
