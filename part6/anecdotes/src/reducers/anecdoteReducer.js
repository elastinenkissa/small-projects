import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload.sort((a, b) => b.votes - a.votes);
        },
        newAnecdote(state, action) {
            state.push(action.payload);
        },
        voteAnecdote(state, action) {
            const id = action.payload;
            const votingAnecdote = state.find((anecdote) => anecdote.id === id);
            const updatedAnecdote = {
                ...votingAnecdote,
                votes: votingAnecdote.votes + 1,
            };
            return state
                .map((anecdote) =>
                    anecdote.id === id ? updatedAnecdote : anecdote
                )
                .sort((a, b) => b.votes - a.votes);
        },
    },
});

export const { setAnecdotes, voteAnecdote, newAnecdote } =
    anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createNew = (anecdote) => {
    return async (dispatch) => {
        const createdAnecdote = await anecdoteService.create(anecdote);
        dispatch(newAnecdote(createdAnecdote));
    };
};

export const voteFor = (id, anecdote) => {
    return async (dispatch) => {
        const votingAnecdote = await anecdoteService.vote(id, anecdote);
        dispatch(voteAnecdote(votingAnecdote.id));
    };
};

export default anecdoteSlice.reducer;
