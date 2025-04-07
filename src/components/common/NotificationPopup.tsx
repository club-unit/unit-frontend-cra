import { Notification } from "src/types/api/notification";
import NotificationElement from "src/components/common/NotificationElement";
import { List, Modal, Pagination } from "antd";
import { NOTI_PAGE_SIZE } from "src/constants/pagination";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { KeyedMutator } from "swr";
import { CommonPagedResponse } from "src/types/api/common";

interface Props {
  notifications: Notification[];
  mutate: KeyedMutator<CommonPagedResponse<Notification>>;
  page: number;
  setPage: (page: number) => void;
  total?: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function NotificationPopup({
  notifications,
  mutate,
  page,
  setPage,
  total,
  isOpen,
  setIsOpen,
}: Props) {
  const handleReadAll = async () => {
    await clientAxios.post<{ url: string }>(API_ROUTES.notifications.readAll());
    await mutate();
  };

  return (
    <Modal
      open={isOpen}
      title="알림 목록"
      onOk={() => handleReadAll()}
      onCancel={() => setIsOpen(false)}
      cancelText="닫기"
      okText="모두 읽음"
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      )}
    >
      <List
        size="small"
        dataSource={notifications}
        renderItem={(notification) => (
          <NotificationElement notification={notification} setIsOpen={setIsOpen} />
        )}
        className="h-[60vh] overflow-auto"
      />
      <div className="flex justify-center w-full">
        <Pagination
          current={page}
          onChange={setPage}
          defaultPageSize={NOTI_PAGE_SIZE}
          total={total}
          showSizeChanger={false}
        />
      </div>
    </Modal>
  );
}

export default NotificationPopup;
