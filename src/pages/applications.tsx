import { withAuth } from "src/components/common/withAuth";
import ApplicationBranchSection from "src/components/pages/applications/ApplicationBranchSection";
import { BRANCH_SLUGS } from "src/constants/branches";
import { useState } from "react";
import useAuthSWR from "src/hooks/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import ApplicationsTableSection from "src/components/pages/applications/ApplicationsTableSection";
import { Application } from "src/types/api/application";
import { CommonListResponse } from "src/types/api/common";
import { Spin } from "antd";
import useAuth from "src/contexts/auth/useAuth";
import ApplicationsStatisticsSection from "src/components/pages/applications/ApplicationsStatisticsSection";
import ApplicationOrderSection from "src/components/pages/applications/ApplicationOrderSection";
import { ApplicationsSortOrder } from "src/types/common";

function ApplicationsPage() {
  const { user } = useAuth();
  const [order, setOrder] = useState<ApplicationsSortOrder>("TIME_DESC");
  const [currentBranch, setCurrentBranch] = useState<string | number>(
    user?.profile.branch || "ALL"
  );
  const { data, mutate } = useAuthSWR<CommonListResponse<Application>>({
    url: API_ROUTES.applications.root(),
    query: { branch: currentBranch !== "ALL" ? currentBranch : undefined },
  });
  const branchList = ["ALL", ...BRANCH_SLUGS.map((slug) => slug.toUpperCase())];
  const sortedApplications = data?.sort((a, b) => {
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
