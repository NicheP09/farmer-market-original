import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // enable if you’re using cookies/sessions
});

export {
    api
}