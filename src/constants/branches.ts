export const BRANCH_SLUGS = ["green", "donga", "city", "union", "jamsil", "jungsan"];

export type Branch = "GREEN" | "DONGA" | "CITY" | "UNION" | "JAMSIL" | "JUNGSAN";

export const BRANCH_LOOKUP_TABLE: Record<Branch, string> = {
  GREEN: "그린",
  DONGA: "동아",
  CITY: "시티",
  UNION: "유니온",
  JAMSIL: "잠실",
  JUNGSAN: "정산",
};
