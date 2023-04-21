import { useDispatch, useSelector } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = (props) => {
    const dispatch = useDispatch();

    const voteHandler = (id) => {
        dispatch(voteFor(id, props.anecdote));
        dispatch(setNotification(`You voted for ${props.anecdote.content}`, 5));
    };
    return (
        <>
            <div>{props.anecdote.content}</div>
            <div>
                has {props.anecdote.votes}
                <button onClick={() => voteHandler(props.anecdote.id)}>
                    vote
                </button>
            </div>
        </>
    );
};

const AnecdoteList = () => {
    const filter = useSelector((state) => state.filter);
    const anecdotes = useSelector((state) =>
        state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().match(filter.toLowerCase())
        )
    );

    return (
        <>
            {anecdotes.map((anecdote) => {
                return (
                    <div key={anecdote.id}>
                        <Anecdote anecdote={anecdote} />
                    </div>
                );
            })}
        </>
    );
};

export default AnecdoteList;
