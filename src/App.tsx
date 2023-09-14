import React from "react";
import { Col, Layout, Row } from "antd";
import MainPage from "src/pages/MainPage";
import AuthOrUserCard from "src/components/common/AuthOrUserCard";
import Navbar from "src/components/common/Navbar";
import { Route, Routes } from "react-router-dom";
import PasswordResetPage from "src/pages/pw-reset";
import RegisterPage from "src/pages/register";
import PostListPage from "src/pages/[slug]";
import PostPage from "src/pages/[slug]/[Id]";

function App() {
  return (
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
  );
}

export default App;
