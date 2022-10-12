import { Formik } from 'formik';
import SignUpForm from './SignUpForm';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

const SignUp = () => {
    const [signUp] = useSignUp();

    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: '',
    };

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .min(1)
            .max(30, 'Username cannot be more than 30 characters long'),
        password: yup
            .string()
            .required('Password is required')
            .min(5, 'Password should be at least 5 characters long')
            .max(50, 'Password cannot be more than 50 characters long'),
        passwordConfirmation: yup
            .string()
            .required('Please repeat your password')
            .oneOf([yup.ref('password'), null], 'Passwords do not match'),
    });

    const submitHandler = async (values) => {
        const { username, password } = values;
        try {
            await signUp({ username, password });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignUp;
