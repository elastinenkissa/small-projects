const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server');
const { mongoose } = require('mongoose');

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const MONGODB_URL =
    'mongodb+srv://cookerdewitt:sarajevo123@cluster0.z4xvgfr.mongodb.net/library?retryWrites=true&w=majority';
const SECRET = 'SECRET';

mongoose.connect(MONGODB_URL).then(() => console.log('Connected to database.'));

// let authors = [
//     {
//         name: 'Robert Martin',
//         id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//         born: 1952,
//     },
//     {
//         name: 'Martin Fowler',
//         id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//         born: 1963,
//     },
//     {
//         name: 'Fyodor Dostoevsky',
//         id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//         born: 1821,
//     },
//     {
//         name: 'Joshua Kerievsky', // birthyear not known
//         id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//     },
//     {
//         name: 'Sandi Metz', // birthyear not known
//         id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//     },
// ];

// let books = [
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: 'Robert Martin',
//         id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring'],
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//         genres: ['agile', 'patterns', 'design'],
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring'],
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring', 'patterns'],
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring', 'design'],
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//         genres: ['classic', 'crime'],
//     },
//     {
//         title: 'The Demon ',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//         genres: ['classic', 'revolution'],
//     },
// ];

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
                return Book.find({});
            }
            if (args.author && args.genre) {
                return Book.find({
                    author: args.author,
                    genres: { $in: [args.genre] },
                });
            }
            if (args.author) {
                return Book.find({ author: args.author });
            }
            if (args.genre) {
                return Book.find({ genres: { $in: [args.genre] } });
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
                await book.save().popula;
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
            const author = Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo }
            );
            try {
                await author.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return author;
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
