import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Col, Layout, Menu, Row } from "antd";
import Link from "next/link";
import { MOCKUP_BOARDS } from "@/mockups/boards";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import AuthOrUserCard from "@/components/common/AuthOrUserCard";
import { NotificationProvider } from "@/contexts/notification/NotificationProvider";

export default function App({ Component, pageProps }: AppProps) {
  const boardsResponse = MOCKUP_BOARDS;
  const menuItems = boardsResponse.map((item) => ({
    label: <Link href="#">{item.name}</Link>,
    key: item.slug,
    children: item.children?.map((child) => ({
      label: <Link href="#">{child.name}</Link>,
      key: child.slug,
    })),
  }));

  return (
    <NotificationProvider>
      <AuthProvider>
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
              <Col span={6} className="pt-2">
                <AuthOrUserCard />
              </Col>
            </Row>
          </Layout.Content>
          <Layout.Footer></Layout.Footer>
        </Layout>
      </AuthProvider>
    </NotificationProvider>
  );
}
