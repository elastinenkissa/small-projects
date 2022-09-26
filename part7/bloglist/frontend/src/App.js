import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blogs from './components/blogs/Blogs';
import Login from './components/users/Login';
import Navbar from './components/misc/Navbar';
import Notification from './components/misc/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import Users from './components/users/Users';
import UserView from './components/users/UserView';
import BlogView from './components/blogs/BlogView';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('currentUser');
        if (loggedUserJSON) {
            dispatch(setUser(JSON.parse(loggedUserJSON)));
        }
    }, []);

    if (user === null) {
        return (
            <>
                <Notification />
                <div>
                    <h2>Login to the bloglist</h2>
                    <Login />
                </div>
            </>
        );
    }

    return (
        <Router>
            <div>
                <Notification />
                <Navbar />
            </div>
            <Routes>
                <Route exact path="/" element={<Blogs />} />
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/users/:id" element={<UserView />} />
                <Route exact path="/blogs/:id" element={<BlogView />} />
            </Routes>
        </Router>
    );
};

export default App;
