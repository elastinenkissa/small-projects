import { useApolloClient, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_LOGGED_USER } from '../graphql/queries';
import theme from '../theme';
import Text from './customUI/Text';
import TextCard from './TextCard';

const ReviewItem = (props) => {
    const dimensionsValue = 35;
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.light,
            flexDirection: 'column',
            padding: theme.positioning.minimumPadding,
        },
        flexContainer1: {
            flexDirection: 'row',
        },
        flexContainer2: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: theme.positioning.minimumPadding + 20,
            paddingBottom: theme.positioning.minimumPadding,
        },
        rating: {
            marginRight: theme.positioning.minimumMargin,
            marginBottom: theme.positioning.minimumMargin,
            ...theme.borders,
            borderRadius: dimensionsValue / 2,
            borderColor: theme.colors.primary,
            borderWidth: 2,
            height: dimensionsValue,
            width: dimensionsValue,
            justifyContent: 'center',
        },
        details: {
            flexDirection: 'column',
        },
        ratingText: {
            textAlign: 'center',
        },
        date: {
            opacity: theme.visibility.greyed,
        },
        text: {
            marginTop: theme.positioning.minimumMargin,
        },
        delete: {
            backgroundColor: theme.colors.error,
        },
    });

    const client = useApolloClient();

    const [deleteReview] = useMutation(DELETE_REVIEW);

    const deleteReviewHandler = () => {
        Alert.alert('Are you sure?', 'You cannot undo this action', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: async () => {
                    deleteReview({ variables: { id: props.item.id } });
                    await client.refetchQueries({
                        include: [GET_LOGGED_USER],
                    });
                },
            },
        ]);
    };

    const createdAt = format(parseISO(props.item.createdAt), 'dd/MM/yyyy');

    return (
        <View style={styles.container}>
            <View style={styles.flexContainer1}>
                <View style={styles.rating}>
                    <Text
                        color="primary"
                        fontWeight="bold"
                        style={styles.ratingText}
                    >
                        {props.item.rating}
                    </Text>
                </View>
                <View style={styles.details}>
                    <Text fontWeight="bold">
                        {props.userReviews
                            ? props.item.repository.name
                            : props.item.user.username}
                    </Text>
                    <Text style={styles.date}>{createdAt}</Text>
                    <Text style={styles.text}>{props.item.text}</Text>
                </View>
            </View>
            {props.userReviews && (
                <View style={styles.flexContainer2}>
                    <Link to={`/reviews/${props.item.repository?.id}`}>
                        <TextCard>View repository</TextCard>
                    </Link>
                    <Pressable onPress={deleteReviewHandler}>
                        <TextCard style={styles.delete}>Delete review</TextCard>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default ReviewItem;
