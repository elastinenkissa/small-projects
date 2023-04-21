import { StyleSheet, View } from 'react-native';
import theme from '../theme';

const AppBarItem = (props) => {
    const styles = StyleSheet.create({
        default: {
            marginRight: theme.positioning.minimumMargin,
            marginLeft: theme.positioning.minimumMargin
        },
    });
    return (
        <View style={styles.default} {...props}>
            {props.children}
        </View>
    );
};

export default AppBarItem;
