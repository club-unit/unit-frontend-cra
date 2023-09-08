import { createContext, ReactNode, useContext } from "react";
import { NotificationInstance } from "antd/es/notification/interface";
import { notification } from "antd";

interface NotificationContextValue {
  api: NotificationInstance;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);
export function NotificationProvider({ children }: { children: ReactNode }) {
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

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context == null) {
    throw new Error("NotificationProvider 안에서 사용해주세요");
  }
  return context;
}
