import axios from "axios";
import Router from "next/router";

export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

clientAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      console.error({
        title: "로그인 만료",
        message: "로그인이 만료되었습니다. 다시 로그인해주세요.",
      });
      Router.push("/");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
