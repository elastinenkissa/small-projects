import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './customUI/Text';
import FormikTextInput from './FormikTextInput';

const SignInForm = (props) => {
    const styles = StyleSheet.create({
        container: {
            alignContent: 'center',
            backgroundColor: theme.colors.light
        },
        button: {
            padding: theme.positioning.minimumPadding,
            paddingTop: 15,
            paddingBottom: 15,
            borderRadius: theme.borders.borderRadius,
            margin: theme.positioning.minimumMargin,
            textAlign: 'center',
        },
    });
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <Pressable onPress={props.onSubmit}>
                <Text blue fontWeight="bold" style={styles.button}>
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

export default SignInForm;
