import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login, returnedToken] = useMutation(LOGIN);

    useEffect(() => {
        if (returnedToken.data) {
            const token = returnedToken.data.login.value;
            props.setToken(token);
            localStorage.setItem('currentUserToken', token);
        }
    }, [returnedToken.data]);

    const loginHandler = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
        setUsername('');
        setPassword('');
        props.setShow('authors');
    };

    if (!props.show) {
        return null;
    }

    return (
        <form onSubmit={loginHandler}>
            <div>
                {' '}
                username:
                <input
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password:
                <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );
};

export default Login;
