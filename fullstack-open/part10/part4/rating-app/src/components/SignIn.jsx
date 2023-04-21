import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {
    const [signIn] = useSignIn();
    const initialValues = {
        username: '',
        password: '',
    };

    const submitHandler = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(3, 'Username must be at least 3 characters long.')
            .required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    return (
        <SignInContainer
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
        />
    );
};

export default SignIn;
