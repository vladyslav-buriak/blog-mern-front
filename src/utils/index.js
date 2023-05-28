import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9832",
});

axios.get("/posts");


// middleware for authorization
instance.interceptors.request.use((confiq) => {
  confiq.headers.Authorization = window.localStorage.getItem('token');
  return confiq;
})
export default instance