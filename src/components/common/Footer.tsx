import { Typography } from "antd";
import { InstagramOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <div className="flex flex-col justify-center bg-gray-300 p-8 pr-16 gap-20">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <Typography.Text style={{ fontSize: 25, fontWeight: 800 }}>UNIT</Typography.Text>
          <Typography.Text style={{ fontSize: 15, fontWeight: 300, color: "#515151" }}>
            유니트 | 대학연합레저스포츠 동아리
          </Typography.Text>
          <div className="mt-2">
            <a href="https://www.instagram.com/clubunit_official/">
              <InstagramOutlined style={{ fontSize: 25 }} />
            </a>
          </div>
        </div>
        <div></div>
      </div>
      <Typography.Text
        style={{ fontSize: 13, fontWeight: 300, textAlign: "center", color: "#515151" }}
      >
        {new Date().getFullYear()} clubunit © All Rights Reserved
      </Typography.Text>
    </div>
  );
}

export default Footer;
