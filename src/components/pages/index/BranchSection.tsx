import BranchCard from "src/components/pages/index/BranchCard";
import { BRANCH_SLUGS } from "src/constants/branches";
import useAuth from "src/contexts/auth/useAuth";

function BranchSection() {
  const { user } = useAuth();

  const restBranches = BRANCH_SLUGS.filter((slug) => slug !== user?.profile.branch.toLowerCase());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {user?.profile.branch && <BranchCard slug={user?.profile.branch.toLowerCase()} myBranch />}
      {restBranches.map((slug) => (
        <BranchCard slug={slug} />
      ))}
    </div>
  );
}

export default BranchSection;
