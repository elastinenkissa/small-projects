import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const RepositoryList = () => {
    const [selectedFilter, setSelectedFilter] = useState('LATEST');

    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDirection] = useState('DESC');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchKeyword] = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (selectedFilter === 'LATEST') {
            setOrderBy('CREATED_AT');
            setOrderDirection('DESC');
        }
        if (selectedFilter === 'HIGHEST') {
            setOrderBy('RATING_AVERAGE');
            setOrderDirection('DESC');
        }
        if (selectedFilter === 'LOWEST') {
            setOrderBy('RATING_AVERAGE');
            setOrderDirection('ASC');
        }
    }, [selectedFilter]);

    const { repositories, loading, fetchMore } = useRepositories({
        orderBy,
        orderDirection,
        searchKeyword,
        first: 8,
    });

    const endReachHandler = () => {
        fetchMore();
    };

    return (
        <RepositoryListContainer
            searchQuery={searchQuery}
            setSearchQuery={(value) => setSearchQuery(value)}
            selectedFilter={selectedFilter}
            setSelectedFilter={(value) => setSelectedFilter(value)}
            repositories={repositories}
            loading={loading}
            onEndReached={endReachHandler}
        />
    );
};

export default RepositoryList;
