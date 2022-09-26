import { useDispatch } from 'react-redux';
import { createBlog } from '../../reducers/blogReducer';
import styled from 'styled-components';

const NewBlog = () => {
    const dispatch = useDispatch();

    const createBlogHandler = (event) => {
        event.preventDefault();
        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
        };
        dispatch(createBlog(blog));
        if (blog.title !== '' && blog.url !== '') {
            event.target.title.value = '';
            event.target.author.value = '';
            event.target.url.value = '';
        }
    };

    return (
        <StyledForm onSubmit={createBlogHandler}>
            <label>Title: </label>
            <input type="text" name="title" placeholder="Title here..." />
            <label>Author: </label>
            <input type="text" name="author" placeholder="Author here..." />
            <label>URL:</label>
            <input type="url" name="url" placeholder="URL here..." />
            <button type="submit">Create</button>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    width: 90px;
    & input {
        height: 20px;
        margin-left: 10px;
        border-color: #f08080;
    }
    & input:hover,
    & input:focus {
        border-color: #FFB6C1;
    }

    & label {
        display: flex;
        line-height: 26px;
        margin-bottom: 10px;
    }

    & button {
        display: block;
        position: relative;
        margin-left: 50%;
        margin-top: 2em;
        width: 100px;
        border: solid;
        border-color: #f08080;
        cursor: pointer;
        line-height: 26px;
    }

    & button:hover {
        color: white;
        background-color: #f08080;
        border: 0;
        line-height: 32px;
    }
`;

export default NewBlog;
