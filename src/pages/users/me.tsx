import { Avatar, Button, Card, Descriptions, Typography, Upload } from "antd";
import useAuth from "src/contexts/auth/useAuth";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { withAuth } from "src/components/common/withAuth";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import getActivityItems from "src/utils/users/getActivityItems";
import getLoginItems from "src/utils/users/getLoginItems";
import useNotification from "src/contexts/notification/useNotfication";
import getPersonalItems from "src/utils/users/getPersonalItems";

function MyPage() {
  const { user } = useAuth();
  const { api } = useNotification();

  const personalItems = user ? getPersonalItems(user) : undefined;
  const loginItems = user ? getLoginItems(user) : undefined;
  const activityItems = user ? getActivityItems(user) : undefined;

  const uploadProfileImage = async (options: any) => {
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
          <Upload name="avatar" showUploadList={false} customRequest={uploadProfileImage}>
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
