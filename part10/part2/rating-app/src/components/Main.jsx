import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'lightgrey',
    },
});

const Main = () => {
    return (
        <>
            <AppBar />
            <View style={styles.container}>
                <Routes>
                    <Route path="/" element={<RepositoryList />} exact />
                    <Route path="/signin" element={<SignIn />} exact />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </View>
        </>
    );
};

export default Main;
