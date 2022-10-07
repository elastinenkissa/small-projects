import { StyleSheet, View } from 'react-native';

const AppBarItem = (props) => {
    const styles = StyleSheet.create({
        default: {
            marginRight: 15,
        },
    });
    return (
        <View style={styles.default} {...props}>
            {props.children}
        </View>
    );
};

export default AppBarItem;
