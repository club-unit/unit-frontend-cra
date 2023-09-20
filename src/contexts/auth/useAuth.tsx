import { useContext } from "react";
import { AuthContext } from "src/contexts/auth/AuthProvider";

function useAuth() {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error("AuthProvider 안에서 사용해주세요");
  }

  return context;
}

export default useAuth;
