import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeUsers } from '../../reducers/usersReducer';

const UserView = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeUsers());
    }, []);
    const id = useParams().id;
    const users = useSelector((state) => state.users);
    const user = users.find((user) => user.id === id);

    return (
        <>
            <h1>{user?.name}</h1>
            <h4>Posted blogs</h4>
            <ul>
                {user?.blogs?.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    );
};

export default UserView;
