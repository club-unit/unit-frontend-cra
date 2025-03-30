import { useMemo } from "react";
import BranchCard from "src/components/pages/index/BranchCard";
import { BRANCH_SLUGS } from "src/constants/branches";
import useAuth from "src/contexts/auth/useAuth";

function BranchSection() {
  const { user } = useAuth();
  const myBranch = user?.profile.branch?.toLowerCase();

  const restBranches = useMemo(() => {
    return BRANCH_SLUGS.filter((slug) => slug !== myBranch);
  }, [myBranch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {myBranch && <BranchCard slug={myBranch} myBranch />}
      {restBranches.map((slug) => (
        <BranchCard slug={slug} key={slug} />
      ))}
    </div>
  );
}

export default BranchSection;
