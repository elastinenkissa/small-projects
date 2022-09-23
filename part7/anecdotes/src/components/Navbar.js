import { Link } from 'react-router-dom';

const Navbar = () => {
    const padding = {
        paddingRight: 5,
    };

    return (
        <>
            <Link to="/" style={padding}>
                Anecdotes
            </Link>
            <Link to="/create" style={padding}>
                New anecdote
            </Link>
            <Link to="about" style={padding}>
                About
            </Link>
        </>
    );
};

export default Navbar;
