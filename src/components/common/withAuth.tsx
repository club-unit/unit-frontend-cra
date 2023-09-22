import { ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";

export function withAuth<P extends object>(Component: ComponentType<P>, isWithAuth: boolean) {
  function AuthComponent(props: P) {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
      return null;
    }

    if (isWithAuth !== isLoggedIn) {
      navigate("/");
      return null;
    }

    return <Component {...props} />;
  }

  return AuthComponent;
}
