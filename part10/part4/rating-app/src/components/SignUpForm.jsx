import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import TextCard from './TextCard';

const SignUpForm = (props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.light,
        },
        button: {
            margin: theme.positioning.minimumMargin,
        },
    });
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry
            />
            <FormikTextInput
                name="passwordConfirmation"
                placeholder="Confirm password"
                secureTextEntry
            />
            <Pressable onPress={props.onSubmit}>
                <TextCard fontWeight="bold" style={styles.button}>
                    Create account
                </TextCard>
            </Pressable>
        </View>
    );
};

export default SignUpForm;
