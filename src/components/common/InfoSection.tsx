import InfoBanner from "src/components/common/InfoBanner";
import useNotices from "src/hooks/api/common/useNotices";

interface Props {
  position: "top" | "side";
}

function InfoSection({ position }: Props) {
  const { data } = useNotices();

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
