import React from "react";
import { Layout } from "antd";
import Navbar from "src/components/common/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Index from "src/pages";
import MyWithAuth from "src/pages/my-page";
import PasswordResetWithAuth from "src/pages/pw-reset";
import RegisterWithAuth from "src/pages/register";
import PostListPage from "src/pages/[slug]";
import PostWritePage from "src/pages/[slug]/write";
import PostPage from "src/pages/[slug]/[Id]";
import AuthOrUserCard from "src/components/common/AuthOrUserCard";

function App() {
  const location = useLocation();

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
            </Routes>
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
