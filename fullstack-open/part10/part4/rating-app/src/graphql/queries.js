import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query repositoriers(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $after: String
        $first: Int
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
            after: $after
            first: $first
        ) {
            edges {
                node {
                    id
                    fullName
                    ratingAverage
                    reviewCount
                    stargazersCount
                    forksCount
                    ownerAvatarUrl
                    description
                    language
                }
                cursor
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query repository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            id
            fullName
            ratingAverage
            reviewCount
            stargazersCount
            forksCount
            ownerAvatarUrl
            description
            language
            url
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        user {
                            username
                        }
                        createdAt
                        text
                        rating
                    }
                    cursor
                }
                pageInfo {
                    hasPreviousPage
                    hasNextPage
                    startCursor
                    endCursor
                }
            }
        }
    }
`;

export const GET_LOGGED_USER = gql`
    query currentUser(
        $includeReviews: Boolean = false
        $first: Int
        $after: String
    ) {
        me {
            username
            id
            reviews(first: $first, after: $after)
                @include(if: $includeReviews) {
                pageInfo {
                    hasPreviousPage
                    hasNextPage
                    endCursor
                    startCursor
                }
                edges {
                    cursor
                    node {
                        id
                        repository {
                            id
                            name
                        }
                        createdAt
                        rating
                        text
                    }
                }
            }
        }
    }
`;
