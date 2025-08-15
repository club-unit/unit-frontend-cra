import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { fetcher } from "src/utils/common/fetcher";
import { SWRConfig } from "swr";
import NotificationProvider from "src/contexts/notification/NotificationProvider";
import AuthProvider from "src/contexts/auth/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import NotiNumUnreadsProvider from "src/contexts/notiNumUnreads/NotiNumUnreadsProvider";

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
            <NotiNumUnreadsProvider>
              <App />
            </NotiNumUnreadsProvider>
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>
);
