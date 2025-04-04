import { withAuth } from "src/components/common/withAuth";
import ApplicationBranchSection from "src/components/pages/applications/ApplicationBranchSection";
import { BRANCH_SLUGS } from "src/constants/branches";
import { useState } from "react";
import ApplicationsTableSection from "src/components/pages/applications/ApplicationsTableSection";
import { Spin } from "antd";
import useAuth from "src/contexts/auth/useAuth";
import ApplicationsStatisticsSection from "src/components/pages/applications/ApplicationsStatisticsSection";
import ApplicationOrderSection from "src/components/pages/applications/ApplicationOrderSection";
import { ApplicationsSortOrder } from "src/types/common";
import useApplications from "src/hooks/api/applications/useApplications";

function ApplicationsPage() {
  const { user } = useAuth();
  const [order, setOrder] = useState<ApplicationsSortOrder>("TIME_DESC");
  const [currentBranch, setCurrentBranch] = useState<string | number>(
    user?.profile.branch || "ALL"
  );
  const { data, mutate } = useApplications({
    branch: currentBranch !== "ALL" ? String(currentBranch) : undefined,
  });

  const branchList = ["ALL", ...BRANCH_SLUGS.map((slug) => slug.toUpperCase())];

  data?.sort((a, b) => {
    if (order === "TIME_ASC") {
      return new Date(a.createdDatetime) > new Date(b.createdDatetime) ? 1 : -1;
    } else if (order === "TIME_DESC") {
      return new Date(b.createdDatetime) > new Date(a.createdDatetime) ? 1 : -1;
    } else if (order === "NAME_ASC") {
      return a.applicant.name.toUpperCase() > b.applicant.name.toUpperCase() ? 1 : -1;
    } else if (order === "STATUS") {
      return a.status > b.status ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <ApplicationBranchSection
        branches={branchList}
        currentBranch={currentBranch}
        setCurrentBranch={setCurrentBranch}
      />
      {data ? (
        <div className="flex flex-col gap-2 mt-2">
          <ApplicationsStatisticsSection applications={data} isOverall={currentBranch === "ALL"} />
          <ApplicationOrderSection orderOption={order} setOrderOption={setOrder} />
          <ApplicationsTableSection applications={data} mutate={mutate} />
        </div>
      ) : (
        <Spin />
      )}
    </>
  );
}

const ApplicationsWithAuth = withAuth(ApplicationsPage, true);

export default ApplicationsWithAuth;
