import BranchSection from "src/components/pages/index/BranchSection";
import InfoSection from "src/components/common/InfoSection";

export default function Index() {
  return (
    <div className="flex flex-col gap-4">
      <InfoSection position="top" />
      <BranchSection />
    </div>
  );
}
