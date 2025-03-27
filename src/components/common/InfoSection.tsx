import InfoBanner from "src/components/common/InfoBanner";
import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { Notice } from "src/types/api/notice";
import { API_ROUTES } from "src/constants/routes";

interface Props {
  position: "top" | "side";
}

function InfoSection({ position }: Props) {
  const { data } = useAuthSWR<CommonListResponse<Notice>>({ url: API_ROUTES.notices.root() });

  return (
    <div
      className={
        position === "top" ? "flex flex-col xl:hidden gap-1" : "xl:flex xl:flex-col hidden gap-1"
      }
    >
      {data?.map((info, index) => (
        <InfoBanner link={info.url} title={info.title} content={info.content} key={index} />
      ))}
    </div>
  );
}

export default InfoSection;
