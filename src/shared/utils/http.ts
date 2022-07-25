import axios from "axios";
import { BASE_API_URL } from "../constants/urls";

export default axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
