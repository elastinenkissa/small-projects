import { useState } from 'react';

const NewBlog = (props) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const urlChangeHandler = (event) => {
        setUrl(event.target.value);
    };

    const authorChangeHandler = (event) => {
        setAuthor(event.target.value);
    };

    const createBlogHandler = (event) => {
        event.preventDefault();
        props.onCreate({
            title: title,
            author: author,
            url: url,
        });
        setTitle('');
        setUrl('');
        setAuthor('');
    };

    return (
        <form onSubmit={createBlogHandler}>
            <div>
                Title:
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={titleChangeHandler}
                    placeholder="Title here..."
                />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={authorChangeHandler}
                    placeholder="Author here..."
                />
            </div>
            <div>
                URL:
                <input
                    type="url"
                    name="url"
                    value={url}
                    onChange={urlChangeHandler}
                    placeholder="URL here..."
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default NewBlog;
