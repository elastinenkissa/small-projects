import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Heading from './customUI/Heading';
import useRepositories from './hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();

    const repositoryNodes = repositories?.edges.map((edge) => edge.node);

    if (loading) {
        return <Heading>Loading...</Heading>;
    }
    if (!repositories) {
        return <Heading>No repositories available at this time.</Heading>;
    }

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <RepositoryItem key={item.id} item={item} />
            )}
        />
    );
};

export default RepositoryList;
