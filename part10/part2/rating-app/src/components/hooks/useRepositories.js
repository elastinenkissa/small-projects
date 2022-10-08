import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries';

const useRepositories = () => {
    const fetchQueries = () => {
        return useQuery(GET_REPOSITORIES, {
            fetchPolicy: 'cache-and-network',
        });
    };
    const { data, loading } = fetchQueries();

    return {
        repositories: data?.repositories,
        loading: loading,
        refetch: fetchQueries,
    };
};

export default useRepositories;
