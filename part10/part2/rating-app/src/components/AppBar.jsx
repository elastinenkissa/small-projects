import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './customUI/AppBarTab';
import Text from './customUI/Text';
import { Link } from 'react-router-native';
import AppBarItem from './AppBarItem';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
});

const AppBar = () => {
    return (
        <AppBarTab style={styles.container}>
            <AppBarItem>
                <Link to="/">
                    <Text light>Repositories</Text>
                </Link>
            </AppBarItem>
            <AppBarItem>
                <Link to="/signin">
                    <Text light>Sign In</Text>
                </Link>
            </AppBarItem>
        </AppBarTab>
    );
};

export default AppBar;
