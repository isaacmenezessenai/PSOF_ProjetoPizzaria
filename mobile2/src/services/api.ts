import axios from "axios";
import { Platform } from "react-native";

const host = "http://10.106.131.60:3000";

export const api = axios.create({
  baseURL: host,
  timeout: 8000,
});