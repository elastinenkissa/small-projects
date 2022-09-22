import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const newAnecdoteHandler = (event) => {
        event.preventDefault();
        if (event.target.new.value === '') {
            return alert('No empty pls');
        }
        dispatch(newAnecdote(event.target.new.value));
        dispatch(setNotification(`Successfully added ${event.target.new.value}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
        event.target.new.value = '';
        
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdoteHandler}>
                <div>
                    <input name="new" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
