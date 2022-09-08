const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const BLOGS = [
    {
        title: 'Test blog 1',
        author: 'Me',
        url: 'http://www.testblog1.com',
        likes: 0,
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = BLOGS.map((blog) => new Blog(blog));
    const blogPromises = blogObjects.map((blog) => blog.save());
    await Promise.all(blogPromises);
});

describe('GET tests', () => {
    test('blogs are in JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('correct number of blogs', async () => {
        const blogs = (await api.get('/api/blogs')).body;
        expect(blogs).toHaveLength(BLOGS.length);
    });

    test('id exists', async () => {
        const blogs = await api.get('/api/blogs');
        const id = blogs.body[0].id;
        expect(id).toBeDefined();
    });
});

describe('POST requests', () => {
    test('new blog is saved and total blog number increases by 1', async () => {
        const newBlog = {
            title: 'Test blog 2',
            author: 'Me',
            url: 'http://www.testblog2.com',
            likes: 0,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = await api.get('/api/blogs');

        expect(blogs.body).toHaveLength(BLOGS.length + 1);
    });

    test('blogs with missing likes will default to 0', async () => {
        const newBlog = {
            title: 'Test blog 1',
            author: 'Me',
            url: 'http://www.testblog1.com',
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = (await api.get('/api/blogs')).body;
        const latestBlog = blogs[blogs.length - 1];

        expect(latestBlog.likes).toEqual(0);
    });

    test('blog with no title and url wont be saved', async () => {
        const newBlog = {
            likes: 0,
        };

        await api.post('/api/blogs').send(newBlog).expect(400);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
