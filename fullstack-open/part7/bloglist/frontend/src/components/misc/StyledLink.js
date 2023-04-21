import { NavLink } from 'react-router-dom';

const StyledLink = (props) => {
    const activeStyle = ({ isActive }) => ({
        color: isActive ? 'greenyellow' : 'tomato',
        textDecoration: 'none',
    });

    return (
        <NavLink end to={props.to} style={activeStyle}>
            {props.children}
        </NavLink>
    );
};

export default StyledLink;
