import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_HOST,
  timeout: 5000,
  headers: { "Content-type": "application/json" },
});
