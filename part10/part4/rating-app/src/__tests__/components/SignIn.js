import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignInContainer';
import * as yup from 'yup';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            // render the SignInContainer component, fill the text inputs and press the submit button
            const submitHandler = jest.fn();
            const initialValues = { username: '', password: '' };
            const credentials = { username: 'matti', password: 'password' };
            const validationSchema = yup.object().shape({
                username: yup
                    .string()
                    .min(3, 'Username must be at least 3 characters long.')
                    .required('Username is required'),
                password: yup.string().required('Password is required'),
            });

            const { getByPlaceholderText, getByText } = render(
                <SignInContainer
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                />
            );

            fireEvent.changeText(getByPlaceholderText('Username'), 'matti');
            fireEvent.changeText(getByPlaceholderText('Password'), 'password');
            fireEvent.press(getByText('Sign in'));

            await waitFor(() => {
                expect(submitHandler).toHaveBeenCalledTimes(1);
                expect(submitHandler.mock.calls[0][0]).toEqual(credentials);
            });
        });
    });
});
