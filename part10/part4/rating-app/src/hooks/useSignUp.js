import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { NEW_USER } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useSignUp = () => {
    const [createUser] = useMutation(NEW_USER);
    const [signIn] = useSignIn();
    const redirect = useNavigate();

    const signUp = async ({ username, password }) => {
        await createUser({
            variables: { user: { username, password } },
        });
        await signIn({ username, password });
        redirect('/');
    };

    return [signUp]
};

export default useSignUp;
