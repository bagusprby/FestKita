

import axios from "axios";

const API_URL = "https://695acd371d8041d5eeb550a2.mockapi.io/events";

export const eventService = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  create: (data) => axios.post(API_URL, data),
  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  remove: (id) => axios.delete(`${API_URL}/${id}`)
};
