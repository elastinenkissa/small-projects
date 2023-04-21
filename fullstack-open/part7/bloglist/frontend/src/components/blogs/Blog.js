import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogById } from '../../reducers/blogReducer';
import StyledLink from '../misc/StyledLink';
import styled from 'styled-components';

const Blog = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const blogStyle = {
        border: 'solid',
        borderWidth: 0.5,
        padding: 5,
        margin: 10,
    };

    const deleteBlogHandler = () => {
        if (window.confirm(`Delete blog ${props.blog.title}?`)) {
            dispatch(deleteBlogById(props.blog.id));
        }
    };

    return (
        <div style={blogStyle} className="main">
            <div className="initial">
                <StyledLink to={`/blogs/${props.blog.id}`}>
                    {props.blog.title}
                </StyledLink>{' '}
                {user && props.blog.user.username === user.username && (
                    <StyledDeleteButton onClick={deleteBlogHandler}>
                        Delete
                    </StyledDeleteButton>
                )}
            </div>
        </div>
    );
};

const StyledDeleteButton = styled.button`
    line-height: 25px;
    cursor: pointer;
    margin-left: 0.5rem;
    border: 0.2em solid;
    border-color: #DC143C;

    &:hover {
        color: white;
        background-color: #DC143C;
        width: 55px;
    }
`;

export default Blog;
