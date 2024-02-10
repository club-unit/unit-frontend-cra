import { Spin, Typography } from "antd";

interface Props {
  title?: string;
}

function ContentHeaderSection({ title }: Props) {
  return (
    <div className="w-full">
      {title ? <Typography.Title level={2}>{title}</Typography.Title> : <Spin />}
    </div>
  );
}

export default ContentHeaderSection;
