const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const BLOGS = [
    {
        title: 'Test blog 1',
        url: 'http://www.testblog1.com',
        likes: 0,
    },
];

const USERS = [
    {
        username: 'test1',
        name: 'Test Tester',
        password: 'hashedpassword1',
    },
];

let authorization;

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const blogObjects = BLOGS.map((blog) => new Blog(blog));
    const blogPromises = blogObjects.map((blog) => blog.save());
    await Promise.all(blogPromises);

    const newUser = {
        username: 'newUser',
        password: 'password',
    };

    await api.post('/api/users').send(newUser);

    const result = await api.post('/api/users/login').send(newUser);

    authorization = {
        Authorization: `Bearer ${result.body.token}`,
    };
});

describe('blog GET tests', () => {
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

describe('blog POST requests', () => {
    test('new blog is saved and total blog number increases by 1', async () => {
        const newBlog = {
            title: 'Test blog 2',
            url: 'http://www.testblog2.com',
            likes: 0,
        };

        await api
            .post('/api/blogs')
            .set(authorization)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = await api.get('/api/blogs');

        expect(blogs.body).toHaveLength(BLOGS.length + 1);
    });

    test('blogs with missing likes will default to 0', async () => {
        const newBlog = {
            title: 'Test blog 1',
            url: 'http://www.testblog1.com',
        };

        await api
            .post('/api/blogs')
            .set(authorization)
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

        await api.post('/api/blogs').set(authorization).send(newBlog).expect(400);
    });

    test('adding a blog fails without a token', async () => {
        const newBlog = {
            title: 'Test blog 1',
            url: 'http://www.testblog1.com',
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401);
    });
});

describe('user POST requests', () => {
    test('invalid users are not created', async () => {
        const newUser = {
            username: 'bl',
            password: 'validpassword',
        };
        await api.post('/api/users').send(newUser).expect(400);

        const users = await api.get('/api/users');

        expect(users.body).toHaveLength(USERS.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
