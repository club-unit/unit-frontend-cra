import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout, Menu } from "antd";
import { boards } from "@/mockups/boards";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  const boardsResponse = boards;
  const menuItems = boardsResponse.map((item) => ({
    label: <Link href="#">{item.name}</Link>,
    key: item.slug,
    children: item.children?.map((child) => ({
      label: <Link href="#">{child.name}</Link>,
      key: child.slug,
    })),
  }));

  return (
    <Layout>
      <Layout.Header>
        <Menu
          items={menuItems}
          mode="horizontal"
          className="bg-transparent text-white text-lg font-bold"
        />
      </Layout.Header>
      <Layout.Content>
        <Component {...pageProps} />
      </Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
}
