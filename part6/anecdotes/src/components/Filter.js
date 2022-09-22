import { useDispatch } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterAnecdoteReducer';

const Filter = () => {
    const dispatch = useDispatch();

    const filterHandler = (event) => {
        dispatch(filterAnecdotes(event.target.value));
    };

    return (
        <div style={{ marginBottom: 15 }}>
            filter <input onChange={filterHandler} />
        </div>
    );
};

export default Filter;
