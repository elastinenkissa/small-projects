import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../reducers/userReducer';
import Links from './Links';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const navStyle = {
        backgroundColor: 'lightslategrey',
        padding: '0.5em',

    }

    const logoutHandler = () => {
        dispatch(removeUser());
    };

    return (
        <div style={navStyle}>
            <Links />
            Logged in as {user.name} {' '}
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default Navbar;
