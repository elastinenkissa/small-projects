import { StyleSheet, TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, ...props }) => {
    const styles = StyleSheet.create({
        default: {
            border: 'solid'
        }
    });

    const textInputStyle = [style, styles.default];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
