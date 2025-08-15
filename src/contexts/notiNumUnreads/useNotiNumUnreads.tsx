import { useContext } from "react";
import { NotiNumUnreadsContext } from "src/contexts/notiNumUnreads/NotiNumUnreadsProvider";

function useNotiNumUnreads() {
  const context = useContext(NotiNumUnreadsContext);
  if (context == null) {
    throw new Error("NotificationProvider 안에서 사용해주세요");
  }
  return context;
}

export default useNotiNumUnreads;
