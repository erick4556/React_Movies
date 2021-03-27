import http from "../http-commom";

const getAll = async () => {
  return http.get("movies");
};

const getById = async (id) => {
  return http.get(`movies/${id}`);
};

const create = async (data) => {
  return http.post("movies", data);
};

const update = async (id, data) => {
  return http.put(`movies/${id}`, data);
};

const remove = async (id) => {
  return http.delete(`movies/${id}`);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
