import { useApolloClient, useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [login, result] = useMutation(LOGIN);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const data = await login({
            variables: { credentials: { username, password } },
        });
        await authStorage.setAccessToken(data.data.authenticate.accessToken);
        await apolloClient.resetStore();
        return data;
    };

    return [signIn, result];
};

export default useSignIn;
