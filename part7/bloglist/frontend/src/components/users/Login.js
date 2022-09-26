import { useDispatch } from 'react-redux';
import { login } from '../../reducers/userReducer';

const Login = () => {
    const dispatch = useDispatch();

    const loginHandler = (event) => {
        event.preventDefault()
        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value,
        };
        dispatch(login(credentials));
    };

    return (
        <form onSubmit={loginHandler}>
            <div>
                Username:
                <input type="text" id="username" name="username" />
            </div>
            <div>
                Password:
                <input type="password" id="password" name="password" />
            </div>
            <button type="submit" id="submitButton">
                Login
            </button>
        </form>
    );
};

export default Login;
