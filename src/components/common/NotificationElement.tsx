import { Card, Typography } from "antd";
import { Notification } from "src/types/api/notification";
import { Link } from "react-router-dom";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";

interface Props {
  notification: Notification;
  setIsOpen: (isOpen: boolean) => void;
  mutate: () => void;
}

function NotificationElement({ notification, setIsOpen, mutate }: Props) {
  const handleNotiClick = async () => {
    setIsOpen(false);
    await clientAxios.post<{ url: string }>(
      API_ROUTES.notifications.readById(notification.notificationId)
    );
    mutate();
  };

  return (
    <Card size="small" className={`hover:bg-gray-200 mb-2 ${notification.isRead && "opacity-50"}`}>
      <Link to={notification.url} onClick={handleNotiClick}>
        <div className="flex flex-col gap-1">
          <Typography.Text strong>{notification.title}</Typography.Text>
          <Typography.Text className="text-gray-400">{notification.extraText}</Typography.Text>
          <div className="flex flex-nowrap gap-2 w-11/12  overflow-hidden">
            <Typography.Text className="my-0 truncate">{notification.content}</Typography.Text>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default NotificationElement;
