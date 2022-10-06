import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Text from './Text';

const AppBarTab = ({ style, ...props }) => {
    const styles = StyleSheet.create({
        default: {
            backgroundColor: theme.backgroundColors.dark,
            height: theme.heights.appBarHeight,
            justifyContent: theme.flex.appBarJustify,
        },
        textStyle: {
            marginLeft: 15,
            color: theme.colors.textSecondary,
        },
    });
    const viewStyles = [styles.default, style];

    return (
        <View style={viewStyles} {...props}>
            <Text fontWeight="bold" style={styles.textStyle}>
                {props.children}
            </Text>
        </View>
    );
};

export default AppBarTab;
