import { withAuth } from "src/components/common/withAuth";

function ApplicationsPage() {
  return <div></div>;
}

const ApplicationsWithAuth = withAuth(ApplicationsPage, true);

export default ApplicationsWithAuth;
