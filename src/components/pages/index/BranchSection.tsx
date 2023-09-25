import BranchCard from "src/components/pages/index/BranchCard";

function BranchSection() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <BranchCard slug="green" />
        <BranchCard slug="donga" />
        <BranchCard slug="city" />
        <BranchCard slug="union" />
        <BranchCard slug="jamsil" />
        <BranchCard slug="jungsan" />
      </div>
    </>
  );
}

export default BranchSection;
