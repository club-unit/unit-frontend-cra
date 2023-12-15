import {
  Avatar,
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Form,
  Image,
  Input,
  Typography,
  Upload,
} from "antd";
import useAuth from "src/contexts/auth/useAuth";
import { SEX_LOOKUP_TABLE } from "src/constants/user";
import dayjs from "dayjs";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Branch } from "src/types/api/profile";
import { useState } from "react";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import { withAuth } from "src/components/common/withAuth";
import { AxiosError } from "axios";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

interface PWInput {
  currentPassword: string;
  password: string;
}

function MyPage() {
  const { user, logout } = useAuth();
  const [isPWEdit, setIsPWEdit] = useState(false);
  const { api } = useNotification();
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
          });
          logout();
        }
      } else {
        api.error({ message: "비밀번호 변경에 실패했습니다.", description: "다시 시도해주세요." });
      }
    }
  };
  const personalItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "이름",
      children: <p>{user?.profile.name}</p>,
    },
    {
      key: "2",
      label: "성별",
      children: <p>{SEX_LOOKUP_TABLE[user?.profile.sex as number]}</p>,
    },
    {
      key: "3",
      label: "전화번호",
      children: <p>{user?.profile.phoneNumber}</p>,
    },
    {
      key: "4",
      label: "생년월일",
      children: <p>{dayjs(user?.profile.birthDate).format("YYYY년 MM월 DD일")}</p>,
    },
  ];

  const loginItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "아이디",
      children: <p>{user?.username}</p>,
    },
    {
      key: "2",
      label: "비밀번호",
      children: isPWEdit ? (
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
      ),
    },
  ];

  const activityItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "지구대",
      children: <p>{BRANCH_LOOKUP_TABLE[user?.profile.branch as Branch]}</p>,
    },
    {
      key: "2",
      label: "가입기수",
      children: <p>{user?.profile.generation}기</p>,
    },
    {
      key: "3",
      label: "활동학기",
      children: <p>{user?.profile.activityTerm}학기</p>,
    },
    {
      key: "4",
      label: "회원등급",
      children: user && (
        <Image
          height={20}
          width={35}
          src={`/icons/rank/${user.profile.rank}.png`}
          alt={String(user.profile.rank)}
          preview={false}
        />
      ),
    },
    ...(user?.profile.responsibility !== "NORMAL"
      ? [
          {
            key: "5",
            label: "직책",
            children: (
              <Image
                height={20}
                width={35}
                src={`/icons/responsibility/${user?.profile.responsibility}.png`}
                alt={String(user?.profile.responsibility)}
                preview={false}
              />
            ),
          },
        ]
      : []),
  ];

  const customRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append("profile_photo", file);

    if (file.size > 2 * 1024 * 1024) {
      api.error({
        message: "이미지 크기가 너무 큽니다.",
        description: "2MB 이하의 이미지를 선택해주세요",
      });
      return;
    }

    try {
      const response = await clientAxios.put(API_ROUTES.users.changeProfilePhoto(), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          onProgress({ percent: (event.loaded / (event.total || 1)) * 100 });
        },
      });
      onSuccess(response.data, file);
    } catch (error) {
      onError(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography.Title level={2}>마이페이지</Typography.Title>
      <Card title="기본 정보">
        <div className="flex flex-col gap-4 justify-end">
          <Avatar icon={<UserOutlined />} src={user?.profile.profilePhoto} size={200} />
          <Upload name="avatar" showUploadList={false} customRequest={customRequest}>
            <Button icon={<UploadOutlined />}>프로필 이미지 변경하기</Button>
          </Upload>
          <Descriptions items={personalItems} />
        </div>
      </Card>
      <Card title="로그인 정보">
        <Descriptions items={loginItems} />
      </Card>
      <Card title="활동 정보">
        <Descriptions items={activityItems} />
      </Card>
    </div>
  );
}

const MyWithAuth = withAuth(MyPage, true);

export default MyWithAuth;
