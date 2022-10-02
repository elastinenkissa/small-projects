/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [state, dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const patientJSON: Patient = JSON.parse(localStorage.getItem(`patient ${id}`) || '{}');
                if (!patientJSON) {
                    const { data: patient } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    localStorage.setItem(
                        `patient ${id}`,
                        JSON.stringify(patient)
                    );
                    dispatch({ type: 'SET_PATIENT', payload: patient });
                }
            } catch (error) {
                console.log(error);
            }
        };
        void fetchPatient();
    }, [dispatch]);

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
                </div>
            )}
        </div>
    );
};

export default PatientPage;
