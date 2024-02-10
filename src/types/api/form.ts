export interface Form {
  title: string;
  description: string;
  sections: FormSection[];
}

export interface FormSection {
  title: string;
  description: string;
  questions: FormQuestion[];
}

export interface FormQuestion {
  content: string;
  description: string;
  type: FormQuestionType;
  isRequired: boolean;
  options: string[];
}

export type FormQuestionType = "MULTIPLE_CHOICE" | "SHORT_ANSWER";
