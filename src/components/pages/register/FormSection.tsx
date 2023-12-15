import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import { Dispatch } from "react";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import dayjs from "dayjs";

interface Props {
  setCurrentStep: Dispatch<number>;
}

interface FormInputs {
  username: string;
  password: string;
  name: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
}

function FormSection({ setCurrentStep }: Props) {
  const { api } = useNotification();
  const onFinish = async (value: FormInputs) => {
    const dateString = dayjs(value.birthDate).format("YYYY-MM-DD");
    const registerForm = { ...value, birthDate: dateString };
    try {
      await clientAxios.post(API_ROUTES.users.signUp(), registerForm);
      setCurrentStep(3);
    } catch (e) {
      api.error({ message: "회원가입에 실패하였습니다.", description: "다시 시도해주세요." });
    }
  };

  return (
    <Form
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className="flex flex-col gap-2"
    >
      <Card title="로그인 정보">
        <Form.Item
          label="아이디"
          name="username"
          rules={[{ required: true, message: "아이디를 입력하세요!" }]}
          className="w-80"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "비밀번호를 입력하세요!" },
            { min: 8, message: "비밀번호는 8자 이상이어야 합니다." },
          ]}
          className="w-80"
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
      </Card>
      <Card title="회원 개인정보">
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: "이름을 입력하세요!" }]}
          className="w-80"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="전화번호"
          name="phoneNumber"
          rules={[
            { required: true, message: "전화번호를 입력하세요!" },
            { pattern: /^[0-9]+$/, message: "숫자만 입력해주세요!" },
          ]}
          className="w-80"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: "이메일을 입력하세요!" }]}
          className="w-80"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="성별"
          name="sex"
          rules={[{ required: true, message: "성별을 입력하세요!" }]}
          className="w-80"
        >
          <Select
            options={[
              { value: 1, label: "남" },
              { value: 2, label: "여" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="생년월일"
          name="birthDate"
          rules={[{ required: true, message: "생년월일을 입력하세요!" }]}
          className="w-80"
        >
          <DatePicker />
        </Form.Item>
      </Card>
      <Form.Item className="flex w-full gap-2 justify-end mt-2">
        <Button type="primary" htmlType="submit">
          가입하기
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormSection;
