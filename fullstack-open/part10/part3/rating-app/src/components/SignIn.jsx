import { Formik } from 'formik';
import { View } from 'react-native';
import SignInForm from './SignInForm';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const SignIn = () => {
    const [signIn] = useSignIn();
    const redirect = useNavigate();
    const initialValues = {
        username: '',
        password: '',
    };

    const submitHandler = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            console.log(data);
            redirect('/')
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
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    );
};

export default SignIn;
