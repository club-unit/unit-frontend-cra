import React, { useEffect, useState } from "react";
import { Drawer, FloatButton, Layout } from "antd";
import Navbar from "src/components/common/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Index from "src/pages";
import MyWithAuth from "src/pages/users/me";
import PasswordResetWithAuth from "src/pages/pw-reset";
import RegisterWithAuth from "src/pages/register";
import PostListPage from "src/pages/[slug]";
import PostWritePage from "src/pages/[slug]/write";
import PostPage from "src/pages/[slug]/[Id]";
import AuthOrUserCard from "src/components/common/AuthOrUserCard";
import NotificationPopup from "src/components/common/NotificationPopup";
import {
  BellOutlined,
  LoginOutlined,
  MenuOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAuth from "src/contexts/auth/useAuth";
import useNotifications from "src/hooks/api/common/useNotifications";
import NotFoundPage from "src/pages/404";
import ProfileWithAuth from "src/pages/users/[id]";
import Footer from "src/components/common/Footer";
import PrivacyPolicy from "src/pages/privacy";
import InfoSection from "src/components/common/InfoSection";
import FormWithAuth from "src/pages/forms/[id]";
import ApplicationsWithAuth from "src/pages/applications";
import useNotiNumUnreads from "src/contexts/notiNumUnreads/useNotiNumUnreads";
import ManagementMainWithAuth from "src/pages/management";
import ManageBowlingMainWithAuth from "src/pages/management/bowling";
import ManageMembersMainWithAuth from "src/pages/management/members";
import BowlingScoresWithAuth from "src/pages/bowling-scores";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const [notiPage, setNotiPage] = useState<number>(1);
  const { isLoggedIn } = useAuth();
  const { numUnreads, mutateNumUnreads } = useNotiNumUnreads();
  const { data: notiData, mutate: notiMutate } = useNotifications({ page: notiPage });

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
              <Route path="/forms">
                <Route path=":id" element={<FormWithAuth />} />
              </Route>
              <Route path="/applications" element={<ApplicationsWithAuth />} />
              <Route path="/bowling-scores" element={<BowlingScoresWithAuth />} />
              <Route path="/management">
                <Route path="" element={<ManagementMainWithAuth />} />
                <Route path="bowling">
                  <Route path="" element={<ManageBowlingMainWithAuth />} />
                </Route>
                <Route path="members">
                  <Route path="" element={<ManageMembersMainWithAuth />} />
                </Route>
              </Route>
              <Route path="/:slug">
                <Route path="" element={<PostListPage />} />
                <Route path="write" element={<PostWritePage />} />
                <Route path=":id" element={<PostPage />} />
              </Route>
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>

            <FloatButton.Group
              trigger="click"
              shape="square"
              type="primary"
              icon={<MenuOutlined />}
              badge={{ count: numUnreads }}
            >
              <FloatButton
                icon={<BellOutlined />}
                onClick={() => setNotiOpen(true)}
                badge={{ count: numUnreads }}
              />
              <FloatButton
                icon={isLoggedIn ? <UserOutlined /> : <LoginOutlined />}
                onClick={() => setOpen(true)}
              />
              {isLoggedIn && (
                <FloatButton
                  icon={<TrophyOutlined />}
                  onClick={() => navigate("/bowling-scores")}
                />
              )}
            </FloatButton.Group>
            <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
              <AuthOrUserCard setOpen={setOpen} />
            </Drawer>
            <NotificationPopup
              notifications={notiData?.results || []}
              page={notiPage}
              setPage={setNotiPage}
              isOpen={notiOpen}
              setIsOpen={setNotiOpen}
              mutate={() => {
                notiMutate();
                mutateNumUnreads();
              }}
            />
          </div>
          {!["/register", "/pw-reset"].includes(location.pathname) && (
            <div className="xl:flex xl:flex-col xl:gap-2 hidden xl:block pt-4">
              <AuthOrUserCard />
              <InfoSection position="side" />
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
