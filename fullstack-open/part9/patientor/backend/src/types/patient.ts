import {
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
} from './entry';

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
    entries?: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn | entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface NewPatientFields {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
