import { createContext, ReactNode } from "react";
import { NotificationInstance } from "antd/es/notification/interface";
import { notification } from "antd";

interface NotificationContextValue {
  api: NotificationInstance;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider
      value={{
        api,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
