import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import TextCard from './TextCard';

const NewReviewForm = (props) => {
    const styles = StyleSheet.create({
        button: {
            margin: theme.positioning.minimumMargin,
        },
    });
    return (
        <View>
            <FormikTextInput
                name="ownerName"
                placeholder="Repository owner name"
            />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput
                name="rating"
                placeholder="Rating between 0 and 100"
            />
            <FormikTextInput multiline name="text" placeholder="Review" />
            <Pressable onPress={props.onSubmit}>
                <TextCard fontWeight="bold" style={styles.button}>
                    Create a review
                </TextCard>
            </Pressable>
        </View>
    );
};

export default NewReviewForm;
