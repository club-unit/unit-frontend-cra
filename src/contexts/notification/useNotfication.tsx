import { useContext } from "react";
import { NotificationContext } from "src/contexts/notification/NotificationProvider";

function useNotification() {
  const context = useContext(NotificationContext);
  if (context == null) {
    throw new Error("NotificationProvider 안에서 사용해주세요");
  }
  return context;
}

export default useNotification;
