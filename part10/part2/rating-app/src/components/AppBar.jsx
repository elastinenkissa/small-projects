import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './customUI/AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        
    },
});

const AppBar = () => {
    return <AppBarTab style={styles.container}>Repositories</AppBarTab>;
};

export default AppBar;
