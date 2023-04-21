const Login = (props) => {
    return (
        <form onSubmit={props.onLogin}>
            <div>
                Username:
                <input
                    type="text"
                    id="username"
                    value={props.username}
                    onChange={props.usernameChange}
                />
            </div>
            <div>
                Password:
                <input
                    type="password"
                    id="password"
                    value={props.password}
                    onChange={props.passwordChange}
                />
            </div>
            <button type="submit" id="submitButton">Login</button>
        </form>
    );
};

export default Login;
