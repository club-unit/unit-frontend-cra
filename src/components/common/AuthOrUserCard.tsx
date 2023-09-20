import useAuth from "src/contexts/auth/useAuth";
import UserCard from "src/components/common/UserCard";
import AuthCard from "src/components/common/AuthCard";
import { useLocation } from "react-router-dom";

function AuthOrUserCard() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (["/register", "/pw-reset"].includes(location.pathname)) {
    return null;
  }

  if (isLoggedIn) {
    return <UserCard />;
  } else {
    return <AuthCard />;
  }
}

export default AuthOrUserCard;
