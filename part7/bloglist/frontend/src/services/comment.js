import axios from 'axios';

const baseUrl = '/api/comments';

import { token } from './token';

const getComments = async () => {
    const comments = await axios.get(baseUrl);
    return comments.data;
};

const postComment = async (comment) => {
    const config = {
        headers: {
            Authorization: token,
        },
    };
    const postedComment = await axios.post(baseUrl, comment, config);
    return postedComment.data;
};

export default { getComments, postComment };
