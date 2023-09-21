import React from "react";
import { Col, Layout, Row } from "antd";
import Index from "src/pages";
import AuthOrUserCard from "src/components/common/AuthOrUserCard";
import Navbar from "src/components/common/Navbar";
import { Route, Routes } from "react-router-dom";
import PasswordResetPage from "src/pages/pw-reset";
import RegisterPage from "src/pages/register";
import PostListPage from "src/pages/[slug]";
import PostPage from "src/pages/[slug]/[Id]";
import PostWritePage from "src/pages/[slug]/write";

function App() {
  return (
    <Layout>
      <Layout.Header>
        <Navbar />
      </Layout.Header>
      <Layout.Content className="flex justify-center">
        <Row className="p-3 w-[80vw] min-h-screen mx-0" gutter={16}>
          <Col span={!["/register", "/pw-reset"].includes(location.pathname) ? 18 : 24}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pw-reset" element={<PasswordResetPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/:slug">
                <Route path="" element={<PostListPage />} />
                <Route path="write" element={<PostWritePage />} />
                <Route path=":id" element={<PostPage />} />
              </Route>
            </Routes>
          </Col>
          {!["/register", "/pw-reset"].includes(location.pathname) && (
            <Col span={6} className="pt-2">
              <AuthOrUserCard />
            </Col>
          )}
        </Row>
      </Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
}

export default App;
