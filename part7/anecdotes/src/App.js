import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdotesList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NewAnecdote from './components/NewAnecdote';

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1,
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2,
        },
    ]);

    const [notification, setNotification] = useState(null);

    const newAnecdoteHandler = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    const notificationHandler = (notification) => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    return (
        <Router>
            <h1>Software anecdotes</h1>
            <Navbar />
            {notification && <p>{notification}</p>}
            <Routes>
                <Route
                    path="/anecdotes/:id"
                    element={<Anecdote fullView={true} anecdotes={anecdotes} />}
                />
                <Route
                    path="/"
                    element={<AnecdoteList anecdotes={anecdotes} />}
                />
                <Route
                    path="/create"
                    element={
                        <NewAnecdote
                            onAdd={newAnecdoteHandler}
                            onSetNotification={notificationHandler}
                        />
                    }
                />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
