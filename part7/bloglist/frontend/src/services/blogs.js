import axios from 'axios';
const baseUrl = '/api/blogs';

import { token } from './token';

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

const update = async (id, object) => {
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
    await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, delet };
