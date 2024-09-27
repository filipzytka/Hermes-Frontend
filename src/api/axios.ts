import axios from "axios";
import { SERVER_URL } from "./constants";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});
