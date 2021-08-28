import http from "../http-commom";

const getAll = async () => {
  return await http.get("movies");
};

const getById = async (id) => {
  return await http.get(`movies/${id}`);
};

const create = async (data) => {
  return await http.post("movies", data);
};

const update = async (id, data) => {
  return await http.put(`movies/${id}`, data);
};

const remove = async (id) => {
  return await http.delete(`movies/${id}`);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
