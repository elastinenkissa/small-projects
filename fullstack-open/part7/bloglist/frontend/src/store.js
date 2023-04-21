import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import commentReducer from './reducers/commentReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer,
        notification: notificationReducer,
        users: usersReducer,
        comments: commentReducer,
    },
});

export default store;
