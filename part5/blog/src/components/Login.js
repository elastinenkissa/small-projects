const Login = (props) => {
    return (
        <form onSubmit={props.onLogin}>
            <div>
                Username:
                <input
                    type="text"
                    name="username"
                    value={props.username}
                    onChange={props.usernameChange}
                />
            </div>
            <div>
                Password:
                <input
                    type="password"
                    name="password"
                    value={props.password}
                    onChange={props.passwordChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
