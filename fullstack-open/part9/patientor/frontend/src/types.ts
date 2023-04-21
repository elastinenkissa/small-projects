export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type EntryBase = {
    id: string;
    date: string;
    type: string;
    specialist: string;
    description: string;
    diagnosisCodes?:  Array<Diagnosis['code']>
};

interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface HospitalEntry extends EntryBase {
    discharge?: Discharge;
}

export interface OccupationalHealthcareEntry extends EntryBase {
    employerName?: string;
    sickLeave?: SickLeave;
}

export enum Rating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends EntryBase {
    healthCheckRating?: Rating;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
}

export enum EntryType {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
}