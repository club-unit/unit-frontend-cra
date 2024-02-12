import { Spin, Typography } from "antd";

interface Props {
  title?: string;
  description?: string;
}

function ContentHeaderSection({ title, description }: Props) {
  return (
    <div className="w-full">
      {title ? <Typography.Title level={2}>{title}</Typography.Title> : <Spin />}
      {description ? (
        <div className="flex flex-col">
          {description.split("\n").map((line, index) => (
            <Typography.Text key={index}>{line}</Typography.Text>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ContentHeaderSection;
