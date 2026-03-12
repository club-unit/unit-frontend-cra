import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { API_ROUTES } from "src/constants/routes";
import { BowlingRecordDate } from "src/types/api/bowling";
import dayjs from "dayjs";

interface BowlingRecordDatesQuery {
  branch?: string;
  startDate?: Date;
  endDate?: Date;
}

function useBowlingRecordDates(query: BowlingRecordDatesQuery) {
  const shouldFetch = query?.startDate && query?.endDate;

  const { data, isLoading, error } = useAuthSWR<CommonListResponse<BowlingRecordDate>>(
    shouldFetch
      ? {
          url: API_ROUTES.bowling.recordDates(),
          query: {
            ...(query.branch && { branch: query.branch }),
            start_date: dayjs(query.startDate).format("YYYY-MM-DD"),
            end_date: dayjs(query.endDate).format("YYYY-MM-DD"),
          },
        }
      : null
  );

  return { data, isLoading, error };
}

export default useBowlingRecordDates;
