import { useAuth } from "@/contexts/auth/AuthProvider";
import UserCard from "@/components/common/UserCard";
import AuthCard from "@/components/common/AuthCard";
import { useRouter } from "next/router";

function AuthOrUserCard() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  console.log(router.pathname);

  if (["/register", "/pw-reset"].includes(router.pathname)) {
    return null;
  }

  if (isLoggedIn) {
    return <UserCard />;
  } else {
    return <AuthCard />;
  }
}

export default AuthOrUserCard;
