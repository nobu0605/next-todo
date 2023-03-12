import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosSetting = axios.create({ baseURL: API_URL });

axiosSetting.interceptors.request.use(
  function (config) {
    const uuid = localStorage.getItem("uuid");

    config.headers["Authorization"] = uuid ? uuid : "none";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosSetting;
