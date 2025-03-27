import { Button, Card, Form, Steps } from "antd";
import { FormSection } from "src/types/api/form";
import FormSectionStep from "src/components/pages/forms/FormSectionStep";
import { useEffect, useState } from "react";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import useNotification from "src/contexts/notification/useNotfication";
import useAuth from "src/contexts/auth/useAuth";

interface Props {
  sections: FormSection[];
}

function FormWrapperSection({ sections }: Props) {
  const [currentSectionNumber, setCurrentSectionNumber] = useState(0);
  const [formAnswer, setFormAnswer] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { api } = useNotification();
  const { logout } = useAuth();
  const sectionsTransformed = [
    ...sections,
    { id: 0, title: "응답 완료", description: "응답 완료", questions: [] },
  ];
  const sectionItems = sectionsTransformed.map((section) => {
    return {
      title: section.title,
    };
  });

  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSectionNumber]);

  const onFinish = async (value: Record<string, string>) => {
    setIsLoading(true);
    const newFormAnswer = { ...formAnswer, ...value };
    setFormAnswer(newFormAnswer);
    if (currentSectionNumber === sectionsTransformed.length - 2) {
      const answerList = Object.keys(newFormAnswer).map((key) => {
        return { questionId: Number(key), content: newFormAnswer[key] || "" };
      });
      const formBody = { answers: answerList };
      try {
        await clientAxios.post(API_ROUTES.forms.answerById(Number(id)), formBody);
        form.resetFields();
        setCurrentSectionNumber(currentSectionNumber + 1);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.data?.code === "token_not_valid") {
            api.error({
              message: "폼 응답에 실패하였습니다.",
              description: "로그인이 만료되었습니다.",
              key: "token-expire",
            });
            logout();
          }
        } else {
          api.error({ message: "폼 응답에 실패하였습니다.", description: "다시 시도해주세요." });
        }
      }
    } else {
      setCurrentSectionNumber(currentSectionNumber + 1);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card className="mt-3">
        <Steps current={currentSectionNumber} items={sectionItems} />
      </Card>
      <Form onFinish={onFinish} form={form}>
        <FormSectionStep
          section={sectionsTransformed[currentSectionNumber]}
          isDone={currentSectionNumber === sectionsTransformed.length - 1}
        />
        <div className="flex flex-row-reverse justify-between mt-5">
          {currentSectionNumber < sectionsTransformed.length - 2 ? (
            <Button type="primary" htmlType="submit">
              다음 섹션으로
            </Button>
          ) : (
            currentSectionNumber < sectionsTransformed.length - 1 && (
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                답변 완료하기
              </Button>
            )
          )}
          {currentSectionNumber > 0 && currentSectionNumber < sectionsTransformed.length - 1 && (
            <Button onClick={() => setCurrentSectionNumber(currentSectionNumber - 1)}>
              이전 섹션으로
            </Button>
          )}
        </div>
      </Form>
    </>
  );
}

export default FormWrapperSection;
