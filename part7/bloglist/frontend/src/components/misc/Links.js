import StyledLink from './StyledLink';

const Links = () => {

    return (
        <>
            <StyledLink to="/">
                Blogs
            </StyledLink>{' '}
            <StyledLink to="/users">
                Users
            </StyledLink>{' '}
        </>
    );
};

export default Links;
