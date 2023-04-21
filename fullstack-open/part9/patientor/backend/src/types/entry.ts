import { Diagnose } from './diagnose';

export type EntryBase = {
    id: string;
    date: string;
    type: string;
    specialist: string;
    description: string;
    diagnosisCodes?: string[];
};

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface HospitalEntry extends EntryBase {
    discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends EntryBase {
    employerName: string;
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

export interface NewBaseEntry {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
}
export interface NewHealthCheckEntry extends NewBaseEntry {
    type: 'HealthCheck';
    healthCheckRating: Rating;
}

export interface NewHospitalEntry extends NewBaseEntry {
    type: 'Hospital';
    discharge?: Discharge;
}

export interface NewOccupationalHealthcareEntry extends NewBaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}
export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthcareEntry
    | NewHealthCheckEntry;
