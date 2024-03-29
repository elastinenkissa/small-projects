import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            id
        }
    }
`;

export const ALL_BOOKS = gql`
    query books($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            id
        }
    }
`;

export const NEW_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            id
        }
    }
`;

export const LOGGED_USER = gql`
    query {
        me {
            username
            favoriteGenre
            id
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;
