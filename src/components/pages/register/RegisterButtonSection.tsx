import { Dispatch } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<number>;
  isAgreed: boolean;
}

const buttonText = ["다음 단계로", "가입하기", "", "홈으로 가기"];

function RegisterButtonSection({ currentStep, setCurrentStep, isAgreed }: Props) {
  const navigate = useNavigate();
  const next = () => {
    if (currentStep === 1) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      navigate("/");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex w-full gap-2 justify-end mt-2">
      {currentStep > 0 ||
        (currentStep < 3 && (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>이전 단계로</Button>
        ))}
      <Button onClick={next} type="primary" className="bg-blue-600" disabled={!isAgreed}>
        {buttonText[currentStep]}
      </Button>
    </div>
  );
}

export default RegisterButtonSection;
