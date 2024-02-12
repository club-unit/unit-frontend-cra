import { FormSection } from "src/types/api/form";
import { Button, Result, Typography } from "antd";
import FormQuestionCard from "src/components/pages/forms/FormQuestionCard";
import { useNavigate } from "react-router-dom";

interface Props {
  section: FormSection;
  isDone: boolean;
}

function FormSectionStep({ section, isDone }: Props) {
  const navgate = useNavigate();

  return (
    <div className="flex flex-col mt-5 gap-2">
      {!isDone ? (
        <>
          <Typography.Text>{section.description}</Typography.Text>
          <div className="flex flex-col gap-4">
            {section.questions.map((question) => (
              <FormQuestionCard question={question} />
            ))}
          </div>
        </>
      ) : (
        <Result
          status="success"
          title="폼 응답이 등록되었습니다!"
          extra={[
            <Button type="primary" onClick={() => navgate("/")}>
              홈으로
            </Button>,
          ]}
        />
      )}
    </div>
  );
}

export default FormSectionStep;
