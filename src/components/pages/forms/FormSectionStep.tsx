import { FormSection } from "src/types/api/form";
import { Typography } from "antd";

interface Props {
  section: FormSection;
  isDone: boolean;
}

function FormSectionStep({ section }: Props) {
  return (
    <div className="mt-5">
      <Typography.Text>{section.description}</Typography.Text>
    </div>
  );
}

export default FormSectionStep;
