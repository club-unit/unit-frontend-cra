import { withAuth } from "src/components/common/withAuth";
import useAuthSWR from "src/hooks/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { useParams } from "react-router-dom";
import { Form } from "src/types/api/form";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import FormWrapperSection from "src/components/pages/forms/FormWrapperSection";
import { Card, Spin } from "antd";

function FormPage() {
  const { id } = useParams();
  const { data } = useAuthSWR<Form>({ url: API_ROUTES.forms.byId(Number(id)) });

  return (
    <>
      <Card>
        <ContentHeaderSection title={data?.title} description={data?.description} />
      </Card>
      {data ? <FormWrapperSection sections={data.sections} /> : <Spin />}
    </>
  );
}

const FormWithAuth = withAuth(FormPage, true);

export default FormWithAuth;
