import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation authenticate($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const NEW_REVIEW = gql`
    mutation createReview($review: CreateReviewInput) {
        createReview(review: $review) {
            repository {
                id
            }
        }
    }
`;

export const NEW_USER = gql`
    mutation createUser($user: CreateUserInput) {
        createUser(user: $user) {
            username
        }
    }
`
export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`