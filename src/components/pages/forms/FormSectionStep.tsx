import { FormSection } from "src/types/api/form";
import { Button, Card, Result, Typography } from "antd";
import FormQuestionCard from "src/components/pages/forms/FormQuestionCard";
import { Link } from "react-router-dom";

interface Props {
  section: FormSection;
  isDone: boolean;
}

function FormSectionStep({ section, isDone }: Props) {
  return (
    <div className="flex flex-col mt-2 gap-2">
      {!isDone ? (
        <>
          {section.description.length > 0 && (
            <Card>
              <Typography.Text>{section.description}</Typography.Text>
            </Card>
          )}
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
            <Link to="/">
              <Button type="primary">홈으로</Button>
            </Link>,
          ]}
        />
      )}
    </div>
  );
}

export default FormSectionStep;
