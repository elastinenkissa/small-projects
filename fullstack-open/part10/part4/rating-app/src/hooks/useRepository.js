import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
    const { id } = useParams();
    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
        variables: { id, ...variables },
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return {
        data,
        loading,
        fetchMore: handleFetchMore,
        ...result,
        id,
    };
};

export default useRepository;
