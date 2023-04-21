import { FlatList } from 'react-native';
import useReviews from '../hooks/useReviews';
import ItemSeparator from './ItemSeperator';
import Loading from './Loading';
import ReviewItem from './ReviewItem';

const UserReviews = () => {
    const { data, loading, fetchMore } = useReviews({
        includeReviews: true,
        first: 8,
    });

    const reviewNodes = data?.me.reviews.edges.map((edge) => edge.node);

    const endReachedHandler = () => {
        fetchMore();
    };

    if (loading) return <Loading />;

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => (
                <ReviewItem userReviews key={item.id} item={item} />
            )}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={endReachedHandler}
            onEndReachedThreshold={0.5}
        />
    );
};

export default UserReviews;
