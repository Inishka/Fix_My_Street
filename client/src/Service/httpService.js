import axios from "axios";

axios.defaults.baseURL = "http://localhost:4200";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = "Bearer "+localStorage.getItem("token");
const get = (url) => {
  return axios.get(url);
};

const post = (url, data) => {
  return axios.post(url, data);
};

const patch = (url, data) => {
  return axios.patch(url, data);
};

const remove = (url, data) => {
  return axios.delete(url, data);
};

export { get, post, patch, remove };
