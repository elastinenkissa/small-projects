import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewAnecdote = (props) => {
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [info, setInfo] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAdd({
            content,
            author,
            info,
            votes: 0,
        });
        navigate('/');
        props.onSetNotification(`A new anecdote: ${content} has been created`);
    };

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    };

    const authorChangeHandler = (event) => {
        setAuthor(event.target.value);
    };

    const infoChangeHandler = (event) => {
        setInfo(event.target.value);
    };

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={submitHandler}>
                <div>
                    Content:
                    <input
                        name="content"
                        value={content}
                        onChange={contentChangeHandler}
                    />
                </div>
                <div>
                    Author:
                    <input
                        name="author"
                        value={author}
                        onChange={authorChangeHandler}
                    />
                </div>
                <div>
                    URL for more info:
                    <input
                        name="info"
                        value={info}
                        onChange={infoChangeHandler}
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    );
};

export default NewAnecdote;
