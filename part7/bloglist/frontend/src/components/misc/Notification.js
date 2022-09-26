import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);

    const error = notification?.error;
    const message = notification?.message;

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

    return notification.message && (
        <div style={error ? errorStyle : normalStyle} id="notification">
            {message}
        </div>
    );
};

export default Notification;
