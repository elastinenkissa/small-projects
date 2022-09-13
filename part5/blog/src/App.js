import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import userService from './services/users';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [hasError, setHasError] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const getBlogs = async () => {
            const returnedBlogs = await blogService.getAll();
            setBlogs(returnedBlogs);
        };
        getBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('currentUser');
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON);
            setUser(loggedUser);
            blogService.setToken(loggedUser.token);
        }
    }, []);

    const usernameInputHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordInputHandler = (event) => {
        setPassword(event.target.value);
    };

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            const loginInfo = {
                username: username,
                password: password,
            };
            const loginUser = await userService.login(loginInfo);

            window.localStorage.setItem(
                'currentUser',
                JSON.stringify(loginUser)
            );
            blogService.setToken(loginUser.token);
            setUser(loginUser);
            setUsername('');
            setPassword('');
        } catch (error) {
            setHasError(true);
            setNotification('Wrong username of password.');
            setTimeout(() => {
                setHasError(false);
                setNotification(null);
            }, 3000);
        }
    };

    const logoutHandler = () => {
        window.localStorage.removeItem('currentUser');
        setUser(null);
        blogService.setToken('');
    };

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const urlChangeHandler = (event) => {
        setUrl(event.target.value);
    };

    const createBlogHandler = async (event) => {
        try {
            event.preventDefault();
            const newBlog = {
                title: title,
                url: url,
            };
            const blog = await blogService.createNew(newBlog);
            setNotification(
                `A new blog "${newBlog.title}" by ${newBlog.url} has been added`
            );
            setTimeout(() => {
              setNotification(null)
            }, 3000);
            setBlogs(blogs.concat(blog));
            setTitle('');
            setUrl('');
        } catch (error) {
            setHasError(true);
            setNotification('Blog must have a title and a URL!');
            setTimeout(() => {
              setHasError(false)
              setNotification(null)
            }, 3000);
        }
    };

    if (user === null) {
        return (
            <>
                <Notification error={hasError} message={notification} />
                <div>
                    <h2>Login to the bloglist</h2>
                    <Login
                        username={username}
                        password={password}
                        onLogin={loginHandler}
                        usernameChange={usernameInputHandler}
                        passwordChange={passwordInputHandler}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <div>
                <Notification error={hasError} message={notification} />
                Logged in as {user.name}
                <button onClick={logoutHandler}>Logout</button>
                <h2>Create new blog</h2>
                <NewBlog
                    title={title}
                    url={url}
                    onCreate={createBlogHandler}
                    titleChange={titleChangeHandler}
                    urlChange={urlChangeHandler}
                />
                <h2>Blogs</h2>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        </>
    );
};

export default App;
