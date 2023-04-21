import axios from 'axios';
const baseUrl = '/api/users';

const login = async (credentials) => {
    const user = await axios.post(`${baseUrl}/login`, credentials);
    return user.data;
};

const getAll = async () => {
    const users = await axios.get(baseUrl)
    return users.data
}

export default { login, getAll };
