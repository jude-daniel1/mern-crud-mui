import http from "../api/api";

export const getTodo = () => http.get("/");
export const createTodo = (data) => http.post("/", data);
export const deleteTodo = (id) => http.delete(`/${id}`);
export const updateTodo = (id, data) => http.put(`/${id}`, data);
export const getSingleTodo = (id) => http.get(`/${id}`);
