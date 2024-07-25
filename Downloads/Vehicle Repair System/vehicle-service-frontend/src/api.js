import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const getComponents = () => axios.get(`${API_URL}components/`);
export const postComponent = (component) =>
  axios.post(`${API_URL}components/`, component);

export const getVehicles = () => axios.get(`${API_URL}vehicles/`);
export const postVehicle = (vehicle) =>
  axios.post(`${API_URL}vehicles/`, vehicle);

export const getIssues = () => axios.get(`${API_URL}issues/`);
export const postIssue = (issue) => axios.post(`${API_URL}issues/`, issue);
export const getFinalPrice = (issueId) =>
  axios.get(`${API_URL}issues/${issueId}/final_price/`);

export const getRevenue = (period) => axios.get(`${API_URL}revenue/${period}/`);
