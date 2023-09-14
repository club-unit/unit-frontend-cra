import axios from "axios";

export const clientAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

export const setupAxiosInterceptors = (handleUnauthenticated: () => void) => {
  clientAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response?.status === 401) {
        if (error.response.data.code === "token_not_valid") {
          handleUnauthenticated();
        }
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
};
