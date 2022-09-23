import Anecdote from './Anecdote';

const AnecdoteList = (props) => {
    return (
        <>
            <h2>Anecdotes</h2>
            <ul>
                {props.anecdotes.map((anecdote) => {
                    return <Anecdote key={anecdote.id} anecdote={anecdote} />;
                })}
            </ul>
        </>
    );
};

export default AnecdoteList;
