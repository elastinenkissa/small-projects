import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const Anecdote = (props) => {
    const dispatch = useDispatch();

    const voteHandler = (id) => {
        dispatch(voteAnecdote(id));
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
    const anecdotes = useSelector((state) => state);

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
