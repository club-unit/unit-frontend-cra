import useAuthSWR from "src/hooks/common/useAuthSWR";
import { Form } from "src/types/api/form";
import { API_ROUTES } from "src/constants/routes";

function useForm(id: number, isDisabled?: boolean) {
  const { data, isLoading } = useAuthSWR<Form>(
    !isDisabled && id ? { url: API_ROUTES.forms.byId(id) } : null
  );
  return { data, isLoading };
}

export default useForm;
