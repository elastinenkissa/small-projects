import { useQuery } from '@apollo/client';
import { GET_LOGGED_USER } from '../graphql/queries';

const useReviews = (variables) => {
    const { data, loading, fetchMore, refetch, ...result } = useQuery(GET_LOGGED_USER, {
        variables,
        fetchPolicy: 'cache-and-network',
    });

    const fetchMoreHandler = () => {
        const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) {
            return;
        }
        fetchMore({
            variables: {
                after: data.me.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return {
        data,
        loading,
        fetchMore: fetchMoreHandler,
        ...result,
        refetch
    };
};

export default useReviews;
