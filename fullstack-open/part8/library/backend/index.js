const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server');
const { mongoose } = require('mongoose');

require('dotenv').config();

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const MONGODB_URL = process.env.MONGODB_URL;

const SECRET = 'SECRET';

mongoose.connect(MONGODB_URL).then(() => console.log('Connected to database.'));

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        id: ID!
    }

    type Query {
        me: User
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => {
            const booksNumber = await Book.find({});
            return booksNumber.length;
        },
        authorCount: async () => {
            const authorsNumber = await Author.find({});
            return authorsNumber.length;
        },
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                return Book.find({}).populate('author');
            }
            if (args.author && args.genre) {
                return Book.find({
                    author: args.author,
                    genres: { $in: [args.genre] },
                }).populate('author');
            }
            if (args.author) {
                return Book.find({ author: args.author }).populate('author');
            }
            if (args.genre) {
                return Book.find({ genres: { $in: [args.genre] } }).populate(
                    'author'
                );
            }
        },
        allAuthors: async () => {
            return Author.find({});
        },
        me: async (root, args, { currentUser }) => {
            return currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('Unauthorized');
            }
            const author = await Author.findOne({ name: args.author });
            const book = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres,
            });
            try {
                if (!author) {
                    const newAuthor = new Author({ name: args.author });
                    await newAuthor.save();
                    book.author = newAuthor._id;
                    return await book.save();
                }
                book.author = author._id;
                await book.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return book.populate('author');
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('Unauthorized');
            }
            try {
                const author = await Author.findOneAndUpdate(
                    { name: args.name },
                    { born: args.setBornTo }
                );
                return author;
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        createUser: async (root, args) => {
            const user = new User({ ...args });
            try {
                user.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return user;
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== 'password') {
                throw new UserInputError('Wrong credentials');
            }
            const tokenPayload = {
                username: user.username,
                id: user._id,
            };
            const token = jwt.sign(tokenPayload, SECRET);

            return { value: token };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
