import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterAnecdoteReducer from './reducers/filterAnecdoteReducer';
import notificationReducer from './reducers/notificationReducer';


export const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterAnecdoteReducer
    },
});
