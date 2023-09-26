import axios from "axios";

export const clientAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

// clientAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       alert("권한이 없습니다.");
//       window.location.replace("/");
//     }
//     return Promise.reject(error);
//   }
// );
