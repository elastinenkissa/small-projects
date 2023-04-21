import { ApolloProvider } from '@apollo/client';
import { Platform, StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import theme from './src/theme';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';

const App = () => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: Platform.select({
                android: theme.fonts.android,
                ios: theme.fonts.ios,
            }),
        },
    });
    const client = createApolloClient();
    console.log(Constants.manifest.extra.env)

    return (
        <NativeRouter>
            <ApolloProvider client={client}>
                <Main style={styles.text} />
            </ApolloProvider>
        </NativeRouter>
    );
};

export default App;
