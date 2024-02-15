import { Dispatch, SetStateAction } from "react";
import { Segmented } from "antd";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Branch } from "src/types/api/profile";

interface Props {
  branches: string[];
  currentBranch: string | number;
  setCurrentBranch: Dispatch<SetStateAction<string | number>>;
}

function ApplicationBranchSection({ branches, currentBranch, setCurrentBranch }: Props) {
  const branchList = [
    ...branches.map((branch) => BRANCH_LOOKUP_TABLE[branch.toUpperCase() as Branch] || "전체"),
  ];

  return (
    <div className="w-full">
      <Segmented options={branchList} value={currentBranch} onChange={setCurrentBranch} />
    </div>
  );
}
export default ApplicationBranchSection;
