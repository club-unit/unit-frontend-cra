import InfoBanner from "src/components/common/InfoBanner";
import { MOCKUP_INFO_LIST } from "src/mockups/info";

interface Props {
  position: "top" | "side";
}

function InfoSection({ position }: Props) {
  const data = MOCKUP_INFO_LIST;

  return (
    <div className={position === "top" ? "flex flex-col xl:hidden" : "xl:flex xl:flex-col hidden"}>
      {data.contents.map((info) => (
        <InfoBanner link={info.link} title={info.title} />
      ))}
    </div>
  );
}

export default InfoSection;
