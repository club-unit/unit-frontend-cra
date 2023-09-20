import { Button, Card, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useAuth from "src/contexts/auth/useAuth";
import useNotification from "src/contexts/notification/useNotfication";
import { Link } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

function AuthCard() {
  const { login } = useAuth();
  const { api } = useNotification();
  const onFinish = async (values: LoginForm) => {
    try {
      const {
        data: { access, refresh },
      } = await clientAxios.post<{ access: string; refresh: string }>(
        API_ROUTES.token.root(),
        values
      );
      login(access, refresh, values.remember);
    } catch (error) {
      //@TODO: 에러 핸들링
      api.error({ message: "인증 오류", description: "알 수 없는 인증 오류 입니다" });
    }
  };

  return (
    <Card size="small" title="Login">
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "아이디를 입력하세요" }]}
          label="아이디"
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
          label="비밀번호"
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>로그인 상태 유지</Checkbox>
          </Form.Item>
          <Link className="text-blue-600 underline" to="/pw-reset">
            비밀번호 찾기
          </Link>
        </div>
        <Form.Item className="mt-2 mb-2">
          <Button type="primary" htmlType="submit" className="bg-blue-600 w-full">
            로그인
          </Button>
        </Form.Item>
        <Link to="/register" className="text-blue-600 underline">
          회원가입
        </Link>
      </Form>
    </Card>
  );
}

export default AuthCard;
