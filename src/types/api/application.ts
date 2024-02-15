import { Branch } from "src/types/api/profile";

export interface Application {
  id: number;
  applicant: Applicant;
  status: ApplicationStatus;
  applicantPath: string;
  university: string;
  grade: string;
  department: string;
  residence: string;
  firstChoice: Branch;
  secondChoice: Branch;
  extra: ExtraQuestion[];
  created: string;
}

export interface Applicant {
  name: string;
  sex: string;
  phoneNumber: string;
  yearAge: string;
}

export interface ExtraQuestion {
  question: string;
  answer: string;
}

export type ApplicationStatus =
  | "FIRST_CHOICE_WAITING"
  | "SECOND_CHOICE_WAITING"
  | "FIRST_CHOICE_JOIN"
  | "SECOND_CHOICE_JOIN"
  | "FIRST_CHOICE_FAIL"
  | "SECOND_CHOICE_FAIL";
