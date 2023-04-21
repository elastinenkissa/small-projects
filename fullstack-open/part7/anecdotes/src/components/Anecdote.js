import { Link, useParams } from 'react-router-dom';

const Anecdote = (props) => {
    const id = useParams().id;
    const anecdote = props.anecdotes?.find((anecdote) => anecdote.id === +id);

    if (props.fullView) {
        return (
            <>
                <h1>
                    {anecdote.content} by {anecdote.author}
                </h1>
                <p>has {anecdote.votes} votes</p>
                <p>
                    For more info, see <a href={anecdote.info}>{anecdote.info}</a>
                </p>
            </>
        );
    }

    return (
        <Link to={`/anecdotes/${props.anecdote.id}`}>
            <li>{props.anecdote.content}</li>
        </Link>
    );
};

export default Anecdote;
