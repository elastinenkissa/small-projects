import { Platform, StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import theme from './src/theme';

const App = () => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: Platform.select({
                android: theme.fonts.android,
                ios: theme.fonts.ios
            })
        }
    })
    return (
        <NativeRouter>
            <Main style={styles.text} />
        </NativeRouter>
    );
};

export default App;
