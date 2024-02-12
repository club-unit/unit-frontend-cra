export interface Form {
  id: number;
  title: string;
  description: string;
  sections: FormSection[];
}

export interface FormSection {
  id: number;
  title: string;
  description: string;
  questions: FormQuestion[];
}

export interface FormQuestion {
  id: number;
  content: string;
  description: string;
  type: FormQuestionType;
  isRequired: boolean;
  options: FormQuestionOption[];
}

export interface FormQuestionOption {
  id: number;
  content: string;
}

export type FormQuestionType = "MULTIPLE_CHOICE" | "SHORT_ANSWER";
