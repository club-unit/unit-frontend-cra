import React, { useEffect, useState } from "react";
import { Drawer, FloatButton, Layout, Typography } from "antd";
import Navbar from "src/components/common/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Index from "src/pages";
import MyWithAuth from "src/pages/users/me";
import PasswordResetWithAuth from "src/pages/pw-reset";
import RegisterWithAuth from "src/pages/register";
import PostListPage from "src/pages/[slug]";
import PostWritePage from "src/pages/[slug]/write";
import PostPage from "src/pages/[slug]/[Id]";
import AuthOrUserCard from "src/components/common/AuthOrUserCard";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "src/contexts/auth/useAuth";
import NotFoundPage from "src/pages/404";
import ProfileWithAuth from "src/pages/users/[id]";
import Footer from "src/components/common/Footer";
import PrivacyPolicy from "src/pages/privacy";

function App() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <Layout>
      <Layout.Header className="px-8">
        <Navbar />
      </Layout.Header>
      <Layout.Content className="flex justify-center pb-32">
        <div className="grid grid-cols-1 xl:grid-cols-4 w-[90vw] md:w-[80vw] 2xl:w-5/6 min-h-screen mx-0 gap-4">
          <div className="col-span-1 xl:col-span-3 pt-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/users">
                <Route path="me" element={<MyWithAuth />} />
                <Route path=":id" element={<ProfileWithAuth />} />
              </Route>
              <Route path="/pw-reset" element={<PasswordResetWithAuth />} />
              <Route path="/register" element={<RegisterWithAuth />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/:slug">
                <Route path="" element={<PostListPage />} />
                <Route path="write" element={<PostWritePage />} />
                <Route path=":id" element={<PostPage />} />
              </Route>
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
            <FloatButton
              onClick={() => setOpen(true)}
              icon={isLoggedIn ? <UserOutlined /> : <LoginOutlined />}
              type="primary"
              description={
                <Typography.Text className="text-white text-xs">
                  {isLoggedIn ? "내정보" : "로그인"}
                </Typography.Text>
              }
              shape="square"
            />
            <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
              <AuthOrUserCard setOpen={setOpen} />
            </Drawer>
          </div>
          {!["/register", "/pw-reset"].includes(location.pathname) && (
            <div className="hidden xl:block pt-4">
              <AuthOrUserCard />
            </div>
          )}
        </div>
      </Layout.Content>
      <Layout.Footer className="p-0">
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default App;
