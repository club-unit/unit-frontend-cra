import { useMemo } from "react";
import BranchCard from "src/components/pages/index/BranchCard";
import { BRANCH_SLUGS } from "src/constants/branches";
import useAuth from "src/contexts/auth/useAuth";
import BoardCard from "src/components/pages/index/BoardCard";

function BranchSection() {
  const { user } = useAuth();
  const myBranch = user?.profile.branch?.toLowerCase();
  const branchSlugs = ["green", "donga", "city", "union", "jamsil"];

  const restBranches = useMemo(() => {
    return branchSlugs.filter((slug) => slug !== myBranch);
  }, [myBranch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <BoardCard slug="all-branch" key="all-branch" title={"전 지구대"} />
      {myBranch && <BranchCard slug={myBranch} myBranch />}
      {restBranches.map((slug) => (
        <BranchCard slug={slug} key={slug} />
      ))}
    </div>
  );
}

export default BranchSection;
