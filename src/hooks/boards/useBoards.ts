import useAuthSWR from "src/hooks/common/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { Board } from "src/types/api/board";
import { API_ROUTES } from "src/constants/routes";

function useBoards(isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonListResponse<Board>>(
    !isDisabled
      ? {
          url: API_ROUTES.boards.root(),
        }
      : null
  );

  return { data, isLoading, mutate, error };
}

export default useBoards;
