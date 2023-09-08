import { useAuth } from "@/contexts/auth/AuthProvider";
import UserCard from "@/components/common/UserCard";
import AuthCard from "@/components/common/AuthCard";

function AuthOrUserCard() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <UserCard />;
  } else {
    return <AuthCard />;
  }
}

export default AuthOrUserCard;
