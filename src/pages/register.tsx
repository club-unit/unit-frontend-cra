import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import { useState } from "react";
import { Steps } from "antd";
import AgreeSection from "src/components/pages/register/AgreeSection";

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const next = () => setCurrentStep(currentStep + 1);

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
      {currentStep === 0 ? <AgreeSection next={next} /> : null}
    </>
  );
}

export default RegisterPage;
