import { Avatar, Button, Card, Descriptions, Upload } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "src/contexts/auth/useAuth";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import getPersonalItems from "src/utils/users/getPersonalItems";
import { OtherUser } from "src/types/api/user";

interface Props {
  otherUser?: OtherUser;
}

function BasicInfoCard({ otherUser }: Props) {
  const { user } = useAuth();
  const { api } = useNotification();

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
      const response = await clientAxios.post(API_ROUTES.users.updateProfilePhoto(), formData, {
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
    <Card title="기본 정보">
      <div className="flex flex-col gap-4 justify-end">
        <Avatar
          icon={<UserOutlined />}
          src={otherUser ? otherUser.profile.profilePhoto : user?.profile.profilePhoto}
          size={200}
        />
        {!otherUser && (
          <Upload name="avatar" showUploadList={false} customRequest={uploadProfileImage}>
            <Button icon={<UploadOutlined />}>프로필 이미지 변경하기</Button>
          </Upload>
        )}
        <Descriptions items={user ? getPersonalItems(otherUser || user, !!user) : undefined} />
      </div>
    </Card>
  );
}

export default BasicInfoCard;
