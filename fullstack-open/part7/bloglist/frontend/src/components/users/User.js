import StyledLink from '../misc/StyledLink';

const User = (props) => {
    return (
        <div>
            <StyledLink to={`/users/${props.user.id}`}>{props.user.name}</StyledLink> -{' '}
            {props.user.blogs.length} blogs
        </div>
    );
};

export default User;
