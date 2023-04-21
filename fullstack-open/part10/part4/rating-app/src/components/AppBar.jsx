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
            {!loggedUser.data?.me ? (
                <>
                    <AppBarItem>
                        <Link to="/signin">
                            <Text light>Sign in</Text>
                        </Link>
                    </AppBarItem>
                    <AppBarItem>
                        <Link to="/signup">
                            <Text light>Sign up</Text>
                        </Link>
                    </AppBarItem>
                </>
            ) : (
                <>
                    <AppBarItem>
                        <Link to={`/${loggedUser.data?.me.id}/reviews`}>
                            <Text light>My reviews</Text>
                        </Link>
                    </AppBarItem>
                    <AppBarItem>
                        <Link to="/reviews/new">
                            <Text light>Create a review</Text>
                        </Link>
                    </AppBarItem>
                    <AppBarItem>
                        <Link onPress={logoutHandler}>
                            <Text light>Sign out</Text>
                        </Link>
                    </AppBarItem>
                </>
            )}
        </AppBarTab>
    );
};

export default AppBar;
