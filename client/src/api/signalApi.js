import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const createSignal = (data) =>
    API.post("/", data);

export const getSignals = () =>
    API.get("/");

export const getSignal = (id) =>
    API.get(`/${id}`);

export const deleteSignal = (id) =>
    API.delete(`/${id}`);