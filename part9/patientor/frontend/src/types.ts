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
    diagnosisCodes?: string[];
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

export interface HealthCheckEntry extends EntryBase {
    healthCheckRating?: number;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

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
