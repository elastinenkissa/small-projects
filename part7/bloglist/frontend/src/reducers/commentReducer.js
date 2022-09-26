import { createSlice } from '@reduxjs/toolkit';

import commentService from '../services/comment';

const commentSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload;
        },
        createComment(state, action) {
            state.push(action.payload);
        },
    },
});

export const { setComments, createComment } = commentSlice.actions;

export const initializeComments = () => {
    return async (dispatch) => {
        const comments = await commentService.getComments();
        dispatch(setComments(comments));
    };
};

export const postComment = (comment) => {
    return async (dispatch) => {
        const createdComment = await commentService.postComment(comment);
        dispatch(createComment(createdComment));
    };
};

export default commentSlice.reducer;
