import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setErrorNotification, setNotification } from './notificationReducer';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        newBlog(state, action) {
            state.push(action.payload);
        },
        likeBlog(state, action) {
            const id = action.payload;
            const likingBlog = state.find((blog) => blog.id === id);
            const likedBlog = {
                ...likingBlog,
                likes: likingBlog.likes + 1,
            };
            return state.map((blog) => (blog.id !== id ? blog : likedBlog));
        },
        deleteBlog(state, action) {
            const id = action.payload;
            return state.filter((blog) => blog.id !== id);
        },
    },
});

export const { setBlogs, newBlog, likeBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (blog) => {
    return async (dispatch) => {
        try {
            const createdBlog = await blogService.create(blog);
            dispatch(newBlog(createdBlog));
            dispatch(
                setNotification(
                    `A new blog "${blog.title}" by ${blog.author} has been added`,
                    3
                )
            );
        } catch (error) {
            dispatch(
                setErrorNotification('Blog must have a title and a URL!', 3)
            );
        }
    };
};

export const likeBlogById = (id, blog) => {
    return async (dispatch) => {
        const likedBlog = await blogService.update(id, blog);
        dispatch(likeBlog(likedBlog.id));
    };
};

export const deleteBlogById = (id) => {
    return async (dispatch) => {
        try {
            await blogService.delet(id);
            dispatch(deleteBlog(id));
            dispatch(setNotification('Succesfully deleted blog!', 3))
        } catch (error) {
            dispatch(
                setErrorNotification('Blog has already been removed!', 3)
            );
        }
    };
};

export const sortBlogs = (blogs) => {
    return async (dispatch) => {
        dispatch(setBlogs(blogs));
    };
};

export default blogSlice.reducer;
