const Notification = (props) => {
    if (props.message === null) return null;

    const normalStyle = {
        margin: '2rem',
        padding: '0.5rem',
        backgroundColor: 'lightcyan',
        border: 'solid',
        borderRadius: '0.3rem',
        borderColor: 'green',
        color: 'green',
    };

    const errorStyle = {
        margin: '2rem',
        padding: '0.5rem',
        backgroundColor: 'salmon',
        border: 'solid',
        borderRadius: '0.3rem',
        borderColor: 'red',
        color: 'red',
    };

    return (
        <div style={props.error ? errorStyle : normalStyle} id="notification">
            {props.message}
        </div>
    );
};

export default Notification;
