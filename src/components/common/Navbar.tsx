import { Menu, MenuProps } from "antd";
import { CommonListResponse } from "src/types/api/common";
import { Board } from "src/types/api/board";
import { API_ROUTES } from "src/constants/routes";
import { Link } from "react-router-dom";
import useAuthSWR from "src/hooks/api/useAuthSWR";
import { useEffect, useState } from "react";
import useAuth from "src/contexts/auth/useAuth";

function Navbar() {
  const { user } = useAuth();

  const { data: boardsResponse, mutate } = useAuthSWR<CommonListResponse<Board>>({
    url: API_ROUTES.boards.root(),
  });

  const boardsAndHome = boardsResponse
    ? [{ slug: "home", name: "UNIT", children: [] }, ...boardsResponse]
    : [{ slug: "home", name: "UNIT", children: [] }];

  const menuItems = boardsAndHome?.map((item) => ({
    label: item.children.length ? (
      item.name
    ) : (
      <Link to={`/${item.slug === "home" ? "" : item.slug}`}>{item.name}</Link>
    ),
    key: item.slug,
    children: item.children.length
      ? item.children?.map((child) => ({
          label: <Link to={`/${child.slug}`}>{child.name}</Link>,
          key: child.slug,
        }))
      : undefined,
  }));

  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (current === "home") {
      setCurrent("");
    }
  }, [current]);

  useEffect(() => {
    if (user) {
      mutate();
    }
  }, [user, mutate]);

  return (
    <Menu
      items={menuItems}
      mode="horizontal"
      className="bg-transparent text-white text-lg font-bold"
      selectedKeys={[current]}
      onClick={onClick}
    />
  );
}

export default Navbar;
