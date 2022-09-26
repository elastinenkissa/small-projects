import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeComments, postComment } from '../../reducers/commentReducer';
import styled from 'styled-components'

const Comments = (props) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments).filter(
        (comment) => comment.blog?.id === props.blog?.id
    );

    useEffect(() => {
        dispatch(initializeComments());
    }, []);

    const addCommentHandler = (event) => {
        event.preventDefault();
        const newComment = {
            content: event.target.content.value,
            blogId: props.blog.id,
        };
        dispatch(postComment(newComment));
        event.target.content.value = '';
    };

    return (
        <>
            <h4>Comments</h4>
            <form onSubmit={addCommentHandler}>
                Comment: <input type="text" name="content" />
                <button type="submit">Add comment</button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <StyledListItem key={comment.id}>
                        <strong>{comment.poster.name}</strong>
                        <div>{comment.content}</div>
                    </StyledListItem>
                ))}
            </ul>
        </>
    );
};


const StyledListItem = styled.li`
    list-style: none;
    border: solid 1px;
    margin: 1em;
    padding: 5px;
`

export default Comments;
