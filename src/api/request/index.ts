import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const BASE_URL = "https://api.neds.com.au/rest/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "content-type": "application/json" },
  timeout: 10000, // 10s
});

const request = <T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  api.request<T>(options);

export default request;
