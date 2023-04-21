import { Formik } from "formik"
import { View } from "react-native"
import SignInForm from "./SignInForm"


const SignInContainer = props => {
    return (
        <View>
            <Formik
                initialValues={props.initialValues}
                onSubmit={props.onSubmit}
                validationSchema={props.validationSchema}
            >
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}
export default SignInContainer