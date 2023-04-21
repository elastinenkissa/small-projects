import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryItemView from './RepositoryItemView';
import NewReview from './NewReview';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

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
                    <Route
                        path="/reviews/:id"
                        element={<RepositoryItemView />}
                        exact
                    />
                    <Route path="/reviews/new" element={<NewReview />} exact />
                    <Route path="/signup" element={<SignUp />} exact />
                    <Route
                        path="/:id/reviews"
                        element={<UserReviews />}
                        exact
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </View>
        </>
    );
};

export default Main;
