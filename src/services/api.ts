import axios from "axios";

const api = axios.create({
  baseURL: "http://pb.e2-n1.debug.app.br/",
});

export default api;

export type Car = {
  id?: string;
  brand: string;
  model: string;
  hp: number;
};
