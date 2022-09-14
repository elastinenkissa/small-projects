import { useState } from 'react';

const NewBlog = (props) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const urlChangeHandler = (event) => {
        setUrl(event.target.value);
    };

    const createBlogHandler = (event) => {
        event.preventDefault();
        props.onCreate({
            title: title,
            url: url,
        });
        setTitle('');
        setUrl('');
    };

    return (
        <form onSubmit={createBlogHandler}>
            <div>
                Title:
                <input
                    type="text"
                    name="title"
                    value={props.title}
                    onChange={titleChangeHandler}
                />
            </div>
            <div>
                URL:
                <input
                    type="url"
                    name="url"
                    value={props.url}
                    onChange={urlChangeHandler}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default NewBlog;
