import useAuth from "src/contexts/auth/useAuth";
import UserCard from "src/components/common/UserCard";
import AuthCard from "src/components/common/AuthCard";

function AuthOrUserCard() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <UserCard />;
  } else {
    return <AuthCard />;
  }
}

export default AuthOrUserCard;
