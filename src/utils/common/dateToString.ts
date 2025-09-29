import dayjs from "dayjs";

interface FormatOptions {
  full?: boolean;
  absolute?: boolean;
}

function formatDateString(dateString: string, options?: FormatOptions) {
  const now = dayjs();
  const date = dayjs(dateString);
  const diffInSeconds = now.diff(date, "second");
  const diffInMinutes = now.diff(date, "minute");
  const diffInHours = now.diff(date, "hour");
  const diffInDays = now.diff(date, "day");

  if (options?.absolute) {
    return date.format(options?.full ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD");
  } else {
    if (diffInSeconds < 60) {
      return "방금";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return date.format(options?.full ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD");
    }
  }
}

export default formatDateString;
