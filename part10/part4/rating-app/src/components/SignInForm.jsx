import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import TextCard from './TextCard';

const SignInForm = (props) => {
    const styles = StyleSheet.create({
        container: {
            alignContent: 'center',
            backgroundColor: theme.colors.light,
        },
        button: {
            margin: theme.positioning.minimumMargin
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
            <Pressable onPress={props.onSubmit}>
                <TextCard fontWeight="bold" style={styles.button}>
                    Sign in
                </TextCard>
            </Pressable>
        </View>
    );
};

export default SignInForm;
