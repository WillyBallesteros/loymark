import axios from "axios";

axios.defaults.baseURL = 'https://localhost:7239/api/';

const requestGeneric = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
  patch: (url, body) => axios.patch(url, body),
};

export default requestGeneric;
