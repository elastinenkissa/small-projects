import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../../reducers/usersReducer';
import User from './User';

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeUsers());
    }, []);
    const users = useSelector((state) => state.users);

    return (
        <>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </ul>
        </>
    );
};

export default Users;
