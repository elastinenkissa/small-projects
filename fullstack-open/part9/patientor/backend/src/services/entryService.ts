/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { Entry, NewEntry } from '../types/entry';
import { Patient } from '../types/patient';

// export const addEntry = (newEntry: NewEntry, patientId: string): Entry => {
//     const entry: Entry = {
//         id: uuid(),
//         ...newEntry,
//     };
//     const modifyingPatient: Patient | undefined = patients.find(
//         (patient: Patient) => patient.id === patientId
//     );
//     const modifyingPatientIndex: number = patients.indexOf(modifyingPatient!);
//     modifyingPatient?.entries?.push(entry);
//     patients.splice(modifyingPatientIndex, 1, modifyingPatient!);
//     return entry;
// };

export const addEntry = (newEntry: NewEntry, patientId: string): Entry => {
    const patient: Patient | undefined = patients.find((patient) => patient.id === patientId);
    if (patient) {
        const addedEntry = {
            ...newEntry,
            id: uuid(),
        };
        patient.entries?.push(addedEntry);
        return addedEntry;
    } else {
        throw new Error(`No patient with ${patientId} found`);
    }
};
