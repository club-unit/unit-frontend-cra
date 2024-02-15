import { withAuth } from "src/components/common/withAuth";
import ApplicationBranchSection from "src/components/pages/applications/ApplicationBranchSection";
import { BRANCH_SLUGS } from "src/constants/branches";
import { useState } from "react";
import useAuthSWR from "src/hooks/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";

function ApplicationsPage() {
  const [currentBranch, setCurrentBranch] = useState<string | number>("ALL");
  const { data } = useAuthSWR({
    url: API_ROUTES.applications.root(),
    query: { branch: currentBranch !== "ALL" ? currentBranch : undefined },
  });
  const branchList = ["ALL", ...BRANCH_SLUGS.map((slug) => slug.toUpperCase())];

  return (
    <>
      <ApplicationBranchSection
        branches={branchList}
        currentBranch={currentBranch}
        setCurrentBranch={setCurrentBranch}
      />
    </>
  );
}

const ApplicationsWithAuth = withAuth(ApplicationsPage, true);

export default ApplicationsWithAuth;
