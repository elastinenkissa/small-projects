import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './customUI/TextInput';
import Text from './customUI/Text';
import theme from '../theme';

const FormikTextInput = (props) => {
    const [field, meta, helpers] = useField(props.name);
    const showError = meta.touched && meta.error;

    const borderColor = showError ? theme.colors.error : theme.colors.dark;
    const styles = StyleSheet.create({
        container: {
            margin: theme.positioning.minimumMargin,
            padding: theme.positioning.minimumPadding,
            borderWidth: theme.borders.borderWidth,
            borderRadius: theme.borders.borderRadius,
            height: 40,
            borderColor,
        },
        errorText: {
            marginLeft: theme.positioning.minimumMargin,
            color: theme.colors.error,
        },
    });

    return (
        <>
            <TextInput
                style={styles.container}
                onChangeText={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
