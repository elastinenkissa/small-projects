import { Formik } from 'formik';
import NewReviewForm from './NewReviewForm';
import * as yup from 'yup';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import { useMutation } from '@apollo/client';
import { NEW_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const NewReview = () => {
    const [createReview] = useMutation(NEW_REVIEW);
    const redirect = useNavigate();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.light,
        },
    });
    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
    };

    const submitHandler = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;
        const ratingNumber = +rating
        try {
            const { data } = await createReview({
                variables: {
                    review: { repositoryName, ownerName, rating: ratingNumber, text },
                },
            });
            const id = data.createReview.repository.id
            redirect(`/reviews/${id}`)
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = yup.object().shape({
        ownerName: yup
            .string()
            .required('Repository owner name is required')
            .lowercase()
            .trim(),
        repositoryName: yup
            .string()
            .required('Repository name is required')
            .lowercase()
            .trim(),
        rating: yup
            .number()
            .required('Rating is required')
            .min(0, 'Rating cannot be below 0')
            .max(100, 'Rating cannot be more than 100')
            .integer('Rating must be a whole number')
            .typeError('Rating must be a number'),
        text: yup.string().optional().max(2000).trim(),
    });

    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => (
                    <NewReviewForm onSubmit={handleSubmit} />
                )}
            </Formik>
        </View>
    );
};

export default NewReview;
