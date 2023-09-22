import { withAuth } from "src/components/common/withAuth";

function PasswordResetPage() {
  return <div>password reset</div>;
}

const PasswordResetWithAuth = withAuth(PasswordResetPage, false);

export default PasswordResetWithAuth;
