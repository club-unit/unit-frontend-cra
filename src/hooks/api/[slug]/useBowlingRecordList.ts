import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { API_ROUTES } from "src/constants/routes";
import { PersonalBowlingRecord } from "src/types/api/bowling";
import { Branch } from "src/types/api/profile";
import dayjs from "dayjs";

interface BowlingRecordListQuery {
  branch?: Branch;
  startDate?: Date;
  endDate?: Date;
}

function useBowlingRecordList(query: BowlingRecordListQuery, isDisabled?: boolean) {
  const shouldFetch = !isDisabled && query?.branch && query?.startDate && query?.endDate;

  const { data, isLoading, mutate, error } = useAuthSWR<CommonListResponse<PersonalBowlingRecord>>(
    shouldFetch
      ? {
          url: API_ROUTES.bowling.records(),
          query: {
            branch: query.branch,
            start_date: dayjs(query.startDate).format("YYYY-MM-DD"),
            end_date: dayjs(query.endDate).format("YYYY-MM-DD"),
          },
        }
      : null
  );

  return { data, isLoading, mutate, error };
}

export default useBowlingRecordList;
