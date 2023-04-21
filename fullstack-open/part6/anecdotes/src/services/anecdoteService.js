import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const anecdotes = await axios.get(baseUrl);
    return anecdotes.data;
};

const create = async (newAnecdote) => {
    const anecdote = await axios.post(baseUrl, newAnecdote)
    return anecdote.data
}

const vote = async (id, votingAnecdote) => {
    const anecdote = await axios.put(`${baseUrl}/${id}`, votingAnecdote)
    return anecdote.data
}

export default { getAll, create, vote };
