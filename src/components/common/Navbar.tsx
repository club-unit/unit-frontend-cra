import { Menu } from "antd";
import Link from "next/link";
import useSWR from "swr";
import { CommonListResponse } from "@/types/api/common";
import { Board } from "@/types/api/board";
import { API_ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/auth/AuthProvider";

function Navbar() {
  const { token } = useAuth();
  const { data: boardsResponse } = useSWR<CommonListResponse<Board>>({
    url: API_ROUTES.boards.root(),
    token,
  });
  const menuItems = boardsResponse?.map((item) => ({
    label: <Link href={`/${item.slug}`}>{item.name}</Link>,
    key: item.slug,
    children: item.children?.map((child) => ({
      label: <Link href={`/${child.slug}`}>{child.name}</Link>,
      key: child.slug,
    })),
  }));

  return (
    <Menu
      items={menuItems}
      mode="horizontal"
      className="bg-transparent text-white text-lg font-bold"
    />
  );
}

export default Navbar;
