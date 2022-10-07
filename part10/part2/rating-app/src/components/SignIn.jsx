import { Formik } from 'formik';
import { View } from 'react-native';
import SignInForm from './SignInForm';
import * as yup from 'yup';

const SignIn = () => {
    const initialValues = {
        username: '',
        password: '',
    };

    const submitHandler = (values) => {
        console.log(values);
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
