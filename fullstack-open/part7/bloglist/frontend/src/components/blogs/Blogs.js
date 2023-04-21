import { useDispatch, useSelector } from 'react-redux';
import { sortBlogs } from '../../reducers/blogReducer';
import BlogList from './BlogList';
import NewBlog from './NewBlog';

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs);
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    const dispatch = useDispatch();

    const likesSortHandler = () => {
        dispatch(sortBlogs(sortedBlogs));
    };
    return (
        <>
            <div>
                <h2>Create new blog</h2>
                <NewBlog />
                <h2>Blogs</h2>
                <button onClick={likesSortHandler}>
                    Sort by number of likes
                </button>
                <BlogList />
            </div>
        </>
    );
};

export default Blogs;
