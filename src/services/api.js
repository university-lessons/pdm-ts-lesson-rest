import axios from "axios";

const api = axios.create({
  baseURL: "https://pdm-cars-api.herokuapp.com",
});

export default api;
