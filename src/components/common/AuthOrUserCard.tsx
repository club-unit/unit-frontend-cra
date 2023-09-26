import useAuth from "src/contexts/auth/useAuth";
import UserCard from "src/components/common/UserCard";
import AuthCard from "src/components/common/AuthCard";
import { Dispatch } from "react";

interface Props {
  setOpen?: Dispatch<boolean>;
}

function AuthOrUserCard({ setOpen }: Props) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <UserCard />;
  } else {
    return <AuthCard setOpen={setOpen} />;
  }
}

export default AuthOrUserCard;
