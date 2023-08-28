import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Col, Layout, Menu, Row } from "antd";
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
      <Layout.Content className="flex justify-center">
        <Row className="p-3 max-w-7xl min-h-screen mx-0" gutter={16}>
          <Col span={18}>
            <Component {...pageProps} />
          </Col>
          <Col span={6}>
            <div className="w-full bg-amber-600 h-full rounded-md">로그인 등 rightSection 자리</div>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
}
