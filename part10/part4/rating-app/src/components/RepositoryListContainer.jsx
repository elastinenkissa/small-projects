import React from 'react';
import { FlatList } from 'react-native';
import { Link } from 'react-router-native';
import Heading from './customUI/Heading';
import ItemSeparator from './ItemSeperator';
import Loading from './Loading';
import RepositoryItem from './RepositoryItem';
import SearchFilter from './SearchFilter';
import SortFilter from './SortFilter';

const RepositoryListContainer = (props) => {
    const repositoryNodes = props.repositories?.edges.map((edge) => edge.node);

    if (props.loading) {
        return <Loading />;
    }

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <SearchFilter
                        setSearchQuery={props.setSearchQuery}
                        searchQuery={props.searchQuery}
                    />
                    <SortFilter
                        setSelectedFilter={props.setSelectedFilter}
                        selectedFilter={props.selectedFilter}
                    />
                </>
            }
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <Link to={`/reviews/${item.id}`}>
                    <RepositoryItem key={item.id} item={item} />
                </Link>
            )}
            ListEmptyComponent={<Heading>No repositories available</Heading>}
            onEndReached={props.onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
};

export default RepositoryListContainer;
