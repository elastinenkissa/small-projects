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

const createNew = async (object) => {
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const blog = await axios.post(baseUrl, object, config)
    return blog.data
};

export default { setToken, getAll, createNew };
