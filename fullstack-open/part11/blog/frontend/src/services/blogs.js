import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = (userToken) => {
  token = `bearer ${userToken}`;
};

const getAll = async () => {
  const blogs = await axios.get(baseUrl);
  return blogs.data;
};

const create = async (object) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const blog = await axios.post(baseUrl, object, config);
  return blog.data;
};

const update = async (object, id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const blog = await axios.put(`${baseUrl}/${id}`, object, config);
  return blog.data;
};

const delet = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const blog = await axios.delete(`${baseUrl}/${id}`, config);
  return blog.data;
};

export default { setToken, getAll, create, update, delet };
