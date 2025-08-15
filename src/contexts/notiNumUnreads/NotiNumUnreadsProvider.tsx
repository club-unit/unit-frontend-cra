import { createContext, ReactNode } from "react";
import useNotificationsNumUnreads from "src/hooks/api/common/useNotificationsNumUnreads";
import useAuth from "src/contexts/auth/useAuth";

interface NotiNumUnreadsContextValue {
  numUnreads?: number;
  mutateNumUnreads: () => void;
}

export const NotiNumUnreadsContext = createContext<NotiNumUnreadsContextValue | null>(null);

function NotiNumUnreadsProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const { data, mutate } = useNotificationsNumUnreads(isLoggedIn);

  return (
    <NotiNumUnreadsContext.Provider
      value={{ numUnreads: data?.numUnreads, mutateNumUnreads: mutate }}
    >
      {children}
    </NotiNumUnreadsContext.Provider>
  );
}

export default NotiNumUnreadsProvider;
