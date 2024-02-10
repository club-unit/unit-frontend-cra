import { FormSection } from "src/types/api/form";
import { Typography } from "antd";
import FormQuestionCard from "src/components/pages/forms/FormQuestionCard";

interface Props {
  section: FormSection;
  isRevealed: boolean;
  isDone: boolean;
}

function FormSectionStep({ section, isRevealed, isDone }: Props) {
  return (
    <div className={`mt-5 ${isRevealed ? "" : "hidden"}`}>
      {isDone && <Typography.Text>{section.description}</Typography.Text>}
      <div className="flex flex-col gap-4">
        {section.questions.map((question) => (
          <FormQuestionCard question={question} />
        ))}
      </div>
    </div>
  );
}

export default FormSectionStep;
