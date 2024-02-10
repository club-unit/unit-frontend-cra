import { withAuth } from "src/components/common/withAuth";

function FormPage() {
  return <></>;
}

const FormWithAuth = withAuth(FormPage, true);

export default FormWithAuth;
