import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'lightgrey'
    },
    heading: {
        margin: 10,
    },
});

const Main = () => {
    return (
        <View>
            <AppBar />
            <View style={styles.container}>
                <RepositoryList />
            </View>
        </View>
    );
};

export default Main;
