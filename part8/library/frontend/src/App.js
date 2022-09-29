import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import { useApolloClient } from '@apollo/client';
import Recommended from './components/Recommended';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(null);

    const client = useApolloClient();

    useEffect(() => {
        const storedToken = localStorage.getItem('currentUserToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('currentUserToken');
        setToken(null);
        client.resetStore();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {!token ? (
                    <button onClick={() => setPage('login')}>login</button>
                ) : (
                    <>
                        <button onClick={() => setPage('recommend')}>recommended</button>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={logoutHandler}>logout</button>
                    </>
                )}
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <Login
                show={page === 'login'}
                setToken={(token) => setToken(token)}
                setShow={(page) => setPage(page)}
            />

            <Recommended show={page === 'recommend'} />
        </div>
    );
};

export default App;
