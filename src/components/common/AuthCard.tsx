import { Button, Card, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

function AuthCard() {
  const onFinish = (values: LoginForm) => {
    console.log("Received values of form: ", values);
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
          <a className="text-blue-600 underline" href="">
            비밀번호 찾기
          </a>
        </div>
        <Form.Item className="mt-2 mb-2">
          <Button type="primary" htmlType="submit" className="bg-blue-600 w-full">
            로그인
          </Button>
        </Form.Item>
        <a href="" className="text-blue-600 underline">
          회원가입
        </a>
      </Form>
    </Card>
  );
}

export default AuthCard;
