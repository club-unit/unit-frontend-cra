import { useState } from "react";
import { Button, Form, Input } from "antd";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useAuth from "src/contexts/auth/useAuth";
import useNotification from "src/contexts/notification/useNotfication";
import { AxiosError } from "axios";

interface PWInput {
  currentPassword: string;
  password: string;
}

function PwChangeForm() {
  const { logout } = useAuth();
  const { api } = useNotification();
  const [isPWEdit, setIsPWEdit] = useState(false);

  const onPWFinish = async (values: PWInput) => {
    try {
      await clientAxios.post(API_ROUTES.users.changePassword(), values);
      setIsPWEdit(false);
      api.success({ message: "비밀번호가 변경되었습니다." });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.code === "token_not_valid") {
          api.error({
            message: "비밀번호 변경에 실패했습니다.",
            description: "로그인이 만료되었습니다.",
            key: "token-expire",
          });
          logout();
        }
      } else {
        api.error({ message: "비밀번호 변경에 실패했습니다.", description: "다시 시도해주세요." });
      }
    }
  };

  return isPWEdit ? (
    <Form onFinish={onPWFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item
        label="기존 비밀번호"
        name="currentPassword"
        rules={[{ required: true, message: "기존 비밀번호를 입력하세요!" }]}
      >
        <Input.Password size="small" />
      </Form.Item>
      <Form.Item
        label="새 비밀번호"
        name="password"
        rules={[{ required: true, message: "새 비밀번호를 입력하세요!" }]}
      >
        <Input.Password size="small" />
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button size="small" htmlType="submit">
          저장
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Button size="small" onClick={() => setIsPWEdit(true)}>
      비밀번호 변경
    </Button>
  );
}

export default PwChangeForm;
