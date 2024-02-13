import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { BellFilled } from "@ant-design/icons";

interface Props {
  link: string;
  title: string;
  content: string;
}

function InfoBanner({ link, title, content }: Props) {
  return (
    <Card size="small" className="hover:bg-gray-200">
      <Link to={link}>
        <div className="flex flex-col gap-1">
          <div className="flex flex-nowrap gap-2 justify-between">
            <Typography.Text strong>{title}</Typography.Text>
            <BellFilled className="text-blue-500" />
          </div>
          <div className="flex flex-nowrap gap-2 w-11/12">
            <div className="flex flex-col">
              {content.split("\n").map((line, index) => (
                <Typography.Text className="my-0" key={index}>
                  {line}
                </Typography.Text>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default InfoBanner;
