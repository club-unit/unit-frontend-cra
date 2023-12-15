import { Typography } from "antd";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string | number;
}

function IconWithText({ icon, text }: Props) {
  return (
    <div className="flex gap-1 items-center">
      {icon}
      <Typography.Text>{text}</Typography.Text>
    </div>
  );
}

export default IconWithText;
