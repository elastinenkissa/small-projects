const dummy = (blogs) => {
    console.log(blogs)
    return 1;
};

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => {
        return blog.likes;
    });

    return likes.reduce((likesSum, currentLikes) => {
        return likesSum + currentLikes;
    }, 0);
};

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

    const favBlog = blogs.find((blog) => blog.likes === mostLikes);

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
