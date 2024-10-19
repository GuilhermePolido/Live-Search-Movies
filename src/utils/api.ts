import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const tmdpAPI = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
});

export function getApi() {
  tmdpAPI.defaults.headers.common["Authorization"] = `Bearer ${
    import.meta.env.VITE_API_READ_ACCESS_TOKEN
  }`;

  return tmdpAPI;
}
