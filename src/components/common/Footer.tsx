import { Typography } from "antd";
import { InstagramOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex flex-col justify-center bg-gray-300 p-8">
      <Typography.Text style={{ fontSize: 25, fontWeight: 800 }}>UNIT</Typography.Text>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <Typography.Text style={{ fontSize: 15, fontWeight: 300, color: "#515151" }}>
            유니트 | 대학연합레저스포츠 동아리
          </Typography.Text>
          <div className="mt-2">
            <a href="https://www.instagram.com/clubunit_official/">
              <InstagramOutlined style={{ fontSize: 25 }} />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Typography.Text style={{ fontSize: 15, fontWeight: 300, color: "#515151" }}>
            회장: 권채영 | 010-9773-7358
          </Typography.Text>
          <Link to="/privacy" className="underline hover:text-blue-500 underline-offset-1">
            <Typography.Text style={{ fontSize: 15, fontWeight: 300, color: "#515151" }}>
              개인정보처리방침
            </Typography.Text>
          </Link>
        </div>
      </div>
      <Typography.Text
        style={{ fontSize: 13, fontWeight: 300, textAlign: "center", color: "#515151" }}
        className="mt-20"
      >
        {new Date().getFullYear()} clubunit © All Rights Reserved
      </Typography.Text>
    </div>
  );
}

export default Footer;
