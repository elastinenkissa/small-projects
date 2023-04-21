import { ScrollView, StyleSheet, View } from 'react-native';
import theme from '../../theme';

const AppBarTab = ({ style, ...props }) => {
    const styles = StyleSheet.create({
        base: {
            backgroundColor: theme.colors.dark,
            height: 100,
        },
        content: { ...theme.horizontalContainer },
    });
    const viewStyles = [styles.base, style];

    return (
        <View style={viewStyles}>
            <ScrollView horizontal contentContainerStyle={styles.content}>
                {props.children}
            </ScrollView>
        </View>
    );
};

export default AppBarTab;
