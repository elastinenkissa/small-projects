import { StyleSheet, View } from 'react-native';
import Text from './Text';

const Heading = (props) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
        },
    });
    return (
        <View style={styles.container}>
            <Text fontSize="heading" fontWeight="bold" style={styles.text} {...props}>
                {props.children}
            </Text>
        </View>
    );
};

export default Heading;
