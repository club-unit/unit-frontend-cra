import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import { useEffect, useState } from "react";
import { Steps } from "antd";
import AgreeSection from "src/components/pages/register/AgreeSection";
import FormSection from "src/components/pages/register/FormSection";

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const next = () => setCurrentStep(currentStep + 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <>
      <ContentHeaderSection title="회원가입" />
      <Steps
        current={currentStep}
        items={[
          {
            title: "약관 동의",
            description: "회칙 / 개인정보처리방침",
          },
          {
            title: "정보 입력",
          },
          {
            title: "회원가입 완료",
          },
        ]}
        className="mb-4"
      />
      {currentStep === 0 ? (
        <AgreeSection next={next} />
      ) : currentStep === 1 ? (
        <FormSection setCurrentStep={setCurrentStep} />
      ) : null}
    </>
  );
}

export default RegisterPage;
