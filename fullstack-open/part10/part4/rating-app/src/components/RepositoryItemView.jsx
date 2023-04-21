import { FlatList, View } from 'react-native';
import useRepository from '../hooks/useRepository';
import Heading from './customUI/Heading';
import ItemSeparator from './ItemSeperator';
import Loading from './Loading';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryItemView = () => {
    const { data, loading, fetchMore } = useRepository({ first: 5 });
    const reviews = data?.repository.reviews.edges.map((edge) => edge.node);

    if (loading) return <Loading />;

    const endReachedHandler = () => {
        fetchMore();
    };

    return (
        <View>
            <FlatList
                ListHeaderComponent={
                    <RepositoryItem singleView item={data?.repository} />
                }
                stickyHeaderIndices={[0]}
                data={reviews}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <ReviewItem key={item.id} item={item} />
                )}
                ListEmptyComponent={<Heading>No reviews available</Heading>}
                onEndReached={endReachedHandler}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default RepositoryItemView;
