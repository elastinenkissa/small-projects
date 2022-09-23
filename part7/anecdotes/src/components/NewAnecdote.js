import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const NewAnecdote = (props) => {
    const navigate = useNavigate();

    const content = useField('text');
    const author = useField('text');
    const info = useField('url');

    const resetFormHandler = () => {
        content.onReset();
        author.onReset();
        info.onReset();
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAdd({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
        navigate('/');
        props.onSetNotification(
            `A new anecdote: ${content.value} has been created`
        );
    };

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={submitHandler}>
                <div>
                    Content:
                    <input {...content} />
                </div>
                <div>
                    Author:
                    <input {...author} />
                </div>
                <div>
                    URL for more info:
                    <input {...info} />
                </div>
                <button type="submit">Create</button>
                <button type='button' onClick={resetFormHandler}>Reset</button>
            </form>
        </div>
    );
};

export default NewAnecdote;
