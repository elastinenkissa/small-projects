import { Grid, Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from '../AddPatientModal/FormField';
import {
    EntryTypeSelectField,
    RatingOption,
    EntryTypeOption,
    RatingSelectField,
} from './FormField';
import { EntryType, HealthCheckEntry, Rating } from '../types';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
    { value: EntryType.HealthCheck, label: 'Health Check' },
];

const ratingOptions: RatingOption[] = [
    { value: Rating.Healthy, label: 'Healthy' },
    { value: Rating.LowRisk, label: 'Low risk' },
    { value: Rating.HighRisk, label: 'High risk' },
    { value: Rating.CriticalRisk, label: 'Critical risk' },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                type: 'HealthCheck',
                healthCheckRating: 0,
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.name = requiredError;
                }
                if (!values.date) {
                    errors.ssn = requiredError;
                }
                if (!values.specialist) {
                    errors.dateOfBirth = requiredError;
                }

                return errors;
            }}
        >
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <EntryTypeSelectField
                            label="EntryType"
                            name="type"
                            options={entryTypeOptions}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <RatingSelectField
                            label="HealthCheckRating"
                            name="healthCheckRating"
                            options={ratingOptions}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: 'left' }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: 'right',
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add entry
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
