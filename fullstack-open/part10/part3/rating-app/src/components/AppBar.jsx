import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './customUI/AppBarTab';
import Text from './customUI/Text';
import { Link } from 'react-router-native';
import AppBarItem from './AppBarItem';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    },
});

const AppBar = () => {
    const loggedUser = useQuery(GET_LOGGED_USER);
    const signOut = useSignOut();

    const logoutHandler = async () => {
        signOut();
    };

    return (
        <AppBarTab style={styles.container}>
            <AppBarItem>
                <Link to="/">
                    <Text light>Repositories</Text>
                </Link>
            </AppBarItem>
            <AppBarItem>
                {!loggedUser.data?.me ? (
                    <Link to="/signin">
                        <Text light>Sign In</Text>
                    </Link>
                ) : (
                    <Link onPress={logoutHandler}>
                        <Text light>Sign Out</Text>
                    </Link>
                )}
            </AppBarItem>
        </AppBarTab>
    );
};

export default AppBar;
