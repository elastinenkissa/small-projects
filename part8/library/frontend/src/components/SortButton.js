const SortButton = (props) => {
    const sortChangeHandler = ({ target }) => {
        props.onSort(target.value);
    };

    return (
        <button value={props.value} onClick={sortChangeHandler}>
            {props.children}
        </button>
    );
};

export default SortButton;
