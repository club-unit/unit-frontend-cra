import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Col, Layout, Row } from "antd";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import AuthOrUserCard from "@/components/common/AuthOrUserCard";
import { NotificationProvider } from "@/contexts/notification/NotificationProvider";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";
import Navbar from "@/components/common/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        shouldRetryOnError: false,
      }}
    >
      <NotificationProvider>
        <AuthProvider>
          <Layout>
            <Layout.Header>
              <Navbar />
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
    </SWRConfig>
  );
}
