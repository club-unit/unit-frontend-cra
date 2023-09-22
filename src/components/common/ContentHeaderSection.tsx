import { Typography } from "antd";

interface Props {
  title: string;
}

function ContentHeaderSection({ title }: Props) {
  return (
    <div className="w-full">
      <Typography.Title level={2}>{title}</Typography.Title>
    </div>
  );
}

export default ContentHeaderSection;
