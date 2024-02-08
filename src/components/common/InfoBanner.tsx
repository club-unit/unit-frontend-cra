import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  title: string;
}

function InfoBanner({ link, title }: Props) {
  return (
    <Card size="small" className="bg-gray-300">
      <Link to={link}>
        <Typography.Text ellipsis>{title}</Typography.Text>
      </Link>
    </Card>
  );
}

export default InfoBanner;
