import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  likeBlogById } from '../../reducers/blogReducer';
import Comments from './Comments';

const BlogView = () => {
    const dispatch = useDispatch();
    const id = useParams().id;

    const blog = useSelector((state) => state.blogs).find(
        (blog) => blog.id === id
    );

    const likeBlogHandler = () => {
        dispatch(likeBlogById(blog.id, blog));
    };

    return (
        <div className="hidden">
            <a href={blog?.url} style={{ textDecoration: 'none' }}>
                {blog?.url}
            </a>
            <p>
                Likes: {blog?.likes}{' '}
                <button onClick={likeBlogHandler} className="likeButton">
                    Like
                </button>
            </p>
            <p>Posted by {blog?.user.name}</p>
            <Comments blog={blog} />
        </div>
    );
};

export default BlogView;
