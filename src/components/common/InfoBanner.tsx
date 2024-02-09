import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

interface Props {
  link: string;
  title: string;
  content: string;
}

function InfoBanner({ link, title, content }: Props) {
  return (
    <Card size="small" className="bg-gray-300">
      <Link to={link}>
        <Typography.Text strong>{title}</Typography.Text>
        <Typography.Text>
          <Marquee pauseOnHover gradient={false}>
            {content}
          </Marquee>
        </Typography.Text>
      </Link>
    </Card>
  );
}

export default InfoBanner;
