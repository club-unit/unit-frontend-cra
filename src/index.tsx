import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { fetcher } from "./utils/fetcher";
import { SWRConfig } from "swr";
import NotificationProvider from "src/contexts/notification/NotificationProvider";
import AuthProvider from "src/contexts/auth/AuthProvider";
import { Col, Layout, Row } from "antd";
import Navbar from "src/components/common/Navbar";
import MainPage from "src/pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PasswordResetPage from "src/pages/pw-reset";
import RegisterPage from "src/pages/register";
import PostPage from "src/pages/[slug]/[Id]";
import PostListPage from "src/pages/[slug]";
import AuthOrUserCard from "src/components/common/AuthOrUserCard";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: fetcher,
        shouldRetryOnError: false,
      }}
    >
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            <Layout>
              <Layout.Header>
                <Navbar />
              </Layout.Header>
              <Layout.Content className="flex justify-center">
                <Row className="p-3 w-[80vw] min-h-screen mx-0" gutter={16}>
                  <Col span={18}>
                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/pw-reset" element={<PasswordResetPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/:slug">
                        <Route path="" element={<PostListPage />} />
                        <Route path=":id" element={<PostPage />} />
                      </Route>
                    </Routes>
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
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>
);
