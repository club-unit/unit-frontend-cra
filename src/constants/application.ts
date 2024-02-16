import { ApplicationStatus } from "src/types/api/application";

export const APPLICATION_STATUS_LOOKUP_TABLE: Record<ApplicationStatus, string> = {
  FIRST_CHOICE_WAITING: "1지망 대기",
  SECOND_CHOICE_WAITING: "2지망 대기",
  FIRST_CHOICE_JOIN: "1지망 합격",
  SECOND_CHOICE_JOIN: "2지망 합격",
  FIRST_CHOICE_FAIL: "1지망 탈락",
  SECOND_CHOICE_FAIL: "2지망 탈락",
};
