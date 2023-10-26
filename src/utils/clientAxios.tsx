import axios from "axios";
import Cookies from "js-cookie";
import {
  ACCESS_COOKIE_NAME,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE_NAME,
  REFRESH_MAX_AGE,
} from "src/constants/jwt";
import { API_ROUTES } from "src/constants/routes";

export const clientAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

axios.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const token: string | undefined = Cookies.get(ACCESS_COOKIE_NAME);

  // if (token) {
  //   console.log("!!!");
  // }

  config.headers.Authorization = token ? `Bearer ${token}` : "asfd";

  return config;
});

interface QueueItem {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

clientAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return clientAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = Cookies.get(REFRESH_COOKIE_NAME);

      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.REACT_APP_API_ENDPOINT}${API_ROUTES.token.refresh()}`, {
            refresh: refreshToken,
          })
          .then(({ data }) => {
            Cookies.set(ACCESS_COOKIE_NAME, data.access, { "max-age": String(ACCESS_MAX_AGE) });
            Cookies.set(REFRESH_COOKIE_NAME, data.refresh, {
              "max-age":
                localStorage.getItem("remember") === "true" ? String(REFRESH_MAX_AGE) : undefined,
            });
            // clientAxios.defaults.headers["Authorization"] = `Bearer ${data.access}`;
            originalRequest.headers["Authorization"] = "Bearer " + data.access;
            processQueue(null, data.access);
            resolve(clientAxios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);
