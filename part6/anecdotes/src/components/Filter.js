import { connect } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterAnecdoteReducer';

const Filter = (props) => {
    const filterHandler = (event) => {
        props.filterAnecdotes((event.target.value));
    };

    return (
        <div style={{ marginBottom: 15 }}>
            filter <input onChange={filterHandler} />
        </div>
    );
};

const mapDispatchToProps = {
    filterAnecdotes
}

export default connect(null, mapDispatchToProps)(Filter);
