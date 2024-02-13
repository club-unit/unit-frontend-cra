import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";
import useNotification from "src/contexts/notification/useNotfication";

export function withAuth<P extends object>(Component: ComponentType<P>, isWithAuth: boolean) {
  function AuthComponent(props: P) {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading } = useAuth();
    const { api } = useNotification();

    useEffect(() => {
      if (isWithAuth !== isLoggedIn) {
        api.error({ message: "로그인이 필요합니다" });
        navigate("/");
      }
    }, [api, isLoggedIn, navigate]);

    if (isLoading) {
      return null;
    }

    return <Component {...props} />;
  }

  return AuthComponent;
}
