import BowlingRecordViewSection from "src/components/pages/bowling/BowlingRecordViewSection";
import { withAuth } from "src/components/common/withAuth";
import useAuth from "src/contexts/auth/useAuth";

function BowlingScoresPage() {
  const { user } = useAuth();

  return <BowlingRecordViewSection initialBranch={user?.profile.branch} />;
}

const BowlingScoresWithAuth = withAuth(BowlingScoresPage, true);

export default BowlingScoresWithAuth;
