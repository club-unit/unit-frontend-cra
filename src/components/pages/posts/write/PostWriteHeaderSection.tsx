import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Branch } from "src/types/api/profile";

function PostWriteHeaderSection() {
  const { slug } = useParams();
  return (
    <div className="w-full">
      <Typography.Title level={2}>
        {BRANCH_LOOKUP_TABLE[slug?.toUpperCase() as Branch]} 글쓰기
      </Typography.Title>
    </div>
  );
}

export default PostWriteHeaderSection;
