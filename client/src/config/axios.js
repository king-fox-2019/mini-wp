import axios from "axios";
const access_token = localStorage.getItem("access_token");

export default axios.create({
  baseURL: "http://localhost:3000/"
});
