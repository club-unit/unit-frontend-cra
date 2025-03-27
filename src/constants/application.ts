import { ApplicationStatus } from "src/types/api/application";
import { ApplicationsSortOrder } from "src/types/common";

export const APPLICATION_STATUS_LOOKUP_TABLE: Record<ApplicationStatus, string> = {
  FIRST_CHOICE_WAITING: "1지망 대기",
  SECOND_CHOICE_WAITING: "2지망 대기",
  FIRST_CHOICE_JOIN: "1지망 합격",
  SECOND_CHOICE_JOIN: "2지망 합격",
  FIRST_CHOICE_FAIL: "1지망 불합격",
  SECOND_CHOICE_FAIL: "2지망 불합격",
};

export const APPLICATION_ORDER_LOOKUP_TABLE: Record<ApplicationsSortOrder, string> = {
  TIME_DESC: "신청 늦은 순",
  TIME_ASC: "신청 빠른 순",
  NAME_ASC: "가나다순",
  STATUS: "상태별",
};
