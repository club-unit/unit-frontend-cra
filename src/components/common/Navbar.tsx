import { ConfigProvider, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "src/contexts/auth/useAuth";
import useBoards from "src/hooks/api/common/useBoards";

function Navbar() {
  const { user } = useAuth();

  const { data: boardsResponse, mutate } = useBoards();

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
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemColor: "#ffffff",
            darkItemHoverColor: "#ffffff",
            darkItemSelectedColor: "#ffffff",
          },
        },
      }}
    >
      <Menu
        items={menuItems}
        mode="horizontal"
        theme="dark"
        className="bg-transparent text-lg font-bold"
        selectedKeys={[current]}
        onClick={onClick}
      />
    </ConfigProvider>
  );
}

export default Navbar;
