import { Button, Form, Steps } from "antd";
import { FormSection } from "src/types/api/form";
import FormSectionStep from "src/components/pages/forms/FormSectionStep";
import { useState } from "react";

interface Props {
  sections: FormSection[];
}

function FormWrapperSection({ sections }: Props) {
  const [currentSectionNumber, setCurrentSectionNumber] = useState(0);
  const sectionsTransformed = [
    ...sections,
    { title: "응답 완료", description: "응답 완료", questions: [] },
  ];
  const sectionItems = sectionsTransformed.map((section) => {
    return {
      title: section.title,
    };
  });

  return (
    <>
      <Steps current={currentSectionNumber} items={sectionItems} />
      <Form>
        <FormSectionStep
          section={sectionsTransformed[currentSectionNumber]}
          isDone={currentSectionNumber === sectionsTransformed.length - 1}
        />
        <div className="flex flex-row-reverse justify-between mt-5">
          {currentSectionNumber < sectionsTransformed.length - 2 ? (
            <Button
              type="primary"
              onClick={() => setCurrentSectionNumber(currentSectionNumber + 1)}
            >
              다음 섹션으로
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => setCurrentSectionNumber(currentSectionNumber + 1)}
            >
              답변 완료하기
            </Button>
          )}
          {currentSectionNumber > 0 && (
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
