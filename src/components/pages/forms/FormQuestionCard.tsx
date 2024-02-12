import { Card, Form, Input, Typography } from "antd";
import { FormQuestion } from "src/types/api/form";

interface Props {
  question: FormQuestion;
}

function FormQuestionCard({ question }: Props) {
  return (
    <Card
      title={
        <div>
          {question.content}
          {question.isRequired && <Typography.Text className="text-red-500"> *</Typography.Text>}
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div>
          <Typography.Text>{question.description}</Typography.Text>
        </div>
        <Form.Item
          name={question.id}
          rules={[{ required: question.isRequired, message: "항목을 입력해주세요." }]}
        >
          {question.type === "SHORT_ANSWER" ? <Input /> : <Input />}
        </Form.Item>
      </div>
    </Card>
  );
}

export default FormQuestionCard;
