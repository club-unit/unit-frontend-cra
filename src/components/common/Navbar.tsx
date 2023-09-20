import { Menu } from "antd";
import useSWR from "swr";
import useAuth from "src/contexts/auth/useAuth";
import { CommonListResponse } from "src/types/api/common";
import { Board } from "src/types/api/board";
import { API_ROUTES } from "src/constants/routes";
import { Link } from "react-router-dom";

function Navbar() {
  const { token } = useAuth();
  const { data: boardsResponse } = useSWR<CommonListResponse<Board>>({
    url: API_ROUTES.boards.root(),
    token,
  });

  const boardsAndHome = boardsResponse
    ? [{ slug: "", name: "UNIT", children: [] }, ...boardsResponse]
    : [{ slug: "", name: "UNIT", children: [] }];

  const menuItems = boardsAndHome?.map((item) => ({
    label: <Link to={`/${item.slug}`}>{item.name}</Link>,
    key: item.slug,
    children: item.children?.map((child) => ({
      label: <Link to={`/${child.slug}`}>{child.name}</Link>,
      key: child.slug,
    })),
  }));

  console.log(menuItems);

  return (
    <Menu
      items={menuItems}
      mode="horizontal"
      className="bg-transparent text-white text-lg font-bold"
    />
  );
}

export default Navbar;
