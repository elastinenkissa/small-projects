import axios from 'axios';
const baseUrl = '/api/users';

const login = async (credentials) => {
  const user = await axios.post(`${baseUrl}/login`, credentials);
  return user.data;
};

export default { login };
