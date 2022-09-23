import { connect } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const newAnecdoteHandler = async (event) => {
        event.preventDefault();
        if (event.target.new.value === '') {
            return alert('No empty pls');
        }
        const anecdote = {
            content: event.target.new.value,
            votes: 0,
        };
        props.createNew(anecdote);
        props.setNotification(
            `Created new anecdote: ${event.target.new.value}`,
            5
        );

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

const mapDispatchToProps = {
    createNew,
    setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
