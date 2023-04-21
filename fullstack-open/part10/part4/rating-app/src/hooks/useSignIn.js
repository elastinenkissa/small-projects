import { useApolloClient, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [login] = useMutation(LOGIN);
    const apolloClient = useApolloClient();
    const redirect = useNavigate('/')

    const signIn = async ({ username, password }) => {
        const data = await login({
            variables: { credentials: { username, password } },
        });
        await authStorage.setAccessToken(data.data.authenticate.accessToken);
        await apolloClient.resetStore();
        redirect('/')
        return data;
    };

    return [signIn];
};

export default useSignIn;
