import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(url).then((res) => res.data);
};

const create = (newObject) => {
  return axios.post(url, newObject).then((res) => res.data);
};

const update = (id, newObject) => {
  return axios.put(`${url}/${id}`, newObject).then((res) => res.data);
};

const deleteObject = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default { getAll, create, update, deleteObject };
