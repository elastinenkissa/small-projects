import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const redirect = useNavigate()

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        redirect('/')
    };

    return signOut;
};

export default useSignOut;
