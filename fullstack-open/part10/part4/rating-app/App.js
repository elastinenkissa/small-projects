import { ApolloProvider } from '@apollo/client';
import { Platform, StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import theme from './src/theme';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/AuthStorageContext';

const App = () => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: Platform.select({
                android: theme.fonts.android,
                ios: theme.fonts.ios,
            }),
        },
    });

    const authStorage = new AuthStorage();
    const client = createApolloClient(authStorage);

    console.log(Constants.manifest.extra.env);

    return (
        <NativeRouter>
            <ApolloProvider client={client}>
                <AuthStorageContext.Provider value={authStorage}>
                    <Main style={styles.text} />
                </AuthStorageContext.Provider>
            </ApolloProvider>
        </NativeRouter>
    );
};

export default App;
