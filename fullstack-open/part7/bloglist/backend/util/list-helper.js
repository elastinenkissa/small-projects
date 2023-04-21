const dummy = (blogs) => {
    console.log(blogs);
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

const mostBlogs = (blogs) => {
    const authors = blogs.map((blog) => blog.author);
    const count = {};
    authors.forEach((author) => {
        count[author] = (count[author] || 0) + 1;
    });
    const countedAuthors = Object.values(count);
    const mostBlogsIndex = countedAuthors.indexOf(Math.max(...countedAuthors));
    const mostBlogsAuthor = Object.keys(count)[mostBlogsIndex];
    const mostBlogsNumber = Object.values(count)[mostBlogsIndex];
    return {
        author: mostBlogsAuthor,
        blogs: mostBlogsNumber,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};
