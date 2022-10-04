/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { addEntry, setPatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import AddEntryModal from '../AddEntryModal';
import { Button } from '@material-ui/core';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [state, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const patientJSON: Patient = JSON.parse(
            localStorage.getItem(`patient ${id}`) || '{}'
        );
        const fetchPatient = async () => {
            try {
                if (!patientJSON) {
                    const { data: patient } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    localStorage.setItem(
                        `patient ${id}`,
                        JSON.stringify(patient)
                    );
                    return dispatch(setPatient(patient));
                }
                dispatch(setPatient(patientJSON));
            } catch (error) {
                console.log(error);
            }
        };
        void fetchPatient();
    }, [dispatch]);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (id) {
                const { data: newEntry } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    values
                );
                dispatch(addEntry(newEntry, id));
                closeModal();
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(error?.response?.data || 'Unrecognized axios error');
                setError(
                    String(error?.response?.data?.error) ||
                        'Unrecognized axios error'
                );
            } else {
                console.error('Unknown error', error);
                setError('Unknown error');
            }
        }
    };

    return (
        <div>
            {id && (
                <div>
                    <h2>
                        {state.patients[id].name}{' '}
                        {state.patients[id].gender === 'male' ? (
                            <MaleIcon></MaleIcon>
                        ) : (
                            <FemaleIcon />
                        )}
                    </h2>
                    <div>
                        <p>ssh: {state.patients[id].ssn}</p>
                        <p>occupation: {state.patients[id].occupation}</p>
                    </div>
                    <h2>Entries</h2>
                    {state.patients[id].entries.map((entry) => {
                        switch (entry.type) {
                            case 'HealthCheck':
                                return <HealthCheck entry={entry} />;
                            case 'Hospital':
                                return <Hospital entry={entry} />;
                            case 'OccupationalHealthcare':
                                return <OccupationalHealthcare entry={entry} />;
                        }
                    })}

                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                    <Button variant="contained" onClick={() => openModal()}>
                        Add New Entry
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PatientPage;
