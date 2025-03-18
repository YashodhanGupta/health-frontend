import axios from "axios";

const API_URL = "https://health-backend-3zzb.onrender.com/";

export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const fetchDoctors = () => axios.get(`${API_URL}/doctors`);
export const bookAppointment = (doctorId) => axios.post(`${API_URL}/appointments`, { doctorId });
export const fetchAppointments = () => axios.get(`${API_URL}/appointments`);
export const cancelAppointment = (id) => axios.delete(`${API_URL}/appointments/${id}`);
