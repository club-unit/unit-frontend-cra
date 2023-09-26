import React, { useEffect, useState } from "react";
import { Drawer, FloatButton, Layout } from "antd";
import Navbar from "src/components/common/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Index from "src/pages";
import MyWithAuth from "src/pages/my-page";
import PasswordResetWithAuth from "src/pages/pw-reset";
import RegisterWithAuth from "src/pages/register";
import PostListPage from "src/pages/[slug]";
import PostWritePage from "src/pages/[slug]/write";
import PostPage from "src/pages/[slug]/[Id]";
import AuthOrUserCard from "src/components/common/AuthOrUserCard";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "src/contexts/auth/useAuth";
import NotFoundPage from "src/pages/404";
import { clientAxios } from "src/utils/clientAxios";
import useNotification from "src/contexts/notification/useNotfication";

function App() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<any>();
  const { isLoggedIn, refresh } = useAuth();
  const { api } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = clientAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        setError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      clientAxios.interceptors.response.eject(interceptor);
    };
  }, [setError]);

  useEffect(() => {
    if (error) {
      if (error?.response?.status === 403) {
        api.error({ message: "권한이 없습니다." });
      } else if (error?.response?.status === 401) {
        if (
          error?.response?.data?.detail === "이 토큰은 모든 타입의 토큰에 대해 유효하지 않습니다"
        ) {
          refresh();
        } else if (
          error?.response?.data?.detail ===
          "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."
        ) {
          navigate("/");
          api.error({ message: "로그인이 필요합니다." });
        }
      }
    }
  }, [api, error, navigate, refresh]);

  return (
    <Layout>
      <Layout.Header>
        <Navbar />
      </Layout.Header>
      <Layout.Content className="flex justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-4 w-[90vw] md:w-[80vw] 2xl:w-5/6 min-h-screen mx-0 gap-4">
          <div className="col-span-1 xl:col-span-3 pt-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/my-page" element={<MyWithAuth />} />
              <Route path="/pw-reset" element={<PasswordResetWithAuth />} />
              <Route path="/register" element={<RegisterWithAuth />} />
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
            />
            <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
              <AuthOrUserCard />
            </Drawer>
          </div>
          {!["/register", "/pw-reset"].includes(location.pathname) && (
            <div className="hidden xl:block pt-4">
              <AuthOrUserCard />
            </div>
          )}
        </div>
      </Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
}

export default App;
