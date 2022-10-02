import { patients } from '../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types/patient';
import { v4 as uuid } from 'uuid';

export const getAllPatients = (): Patient[] => {
    return patients;
};

export const getPatient = (id: string): Patient | undefined => {
    const patient: Patient | undefined = patients.find(
        (patient: Patient) => patient.id === id
    );
    return patient;
};

export const getPatientsWithNoSSN = (): PublicPatient[] => {
    return patients.map((patient: Patient) => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
        };
    });
};

export const addNewPatient = (patient: NewPatient): Patient => {
    const addingPatient = {
        id: uuid(),
        ...patient,
    };
    patients.push(addingPatient);
    return addingPatient;
};
