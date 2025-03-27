import { withAuth } from "src/components/common/withAuth";
import { useParams } from "react-router-dom";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import FormWrapperSection from "src/components/pages/forms/FormWrapperSection";
import { Card, Spin } from "antd";
import useForm from "src/hooks/api/forms/useForm";

function FormPage() {
  const { id } = useParams();
  const { data } = useForm(Number(id));

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
