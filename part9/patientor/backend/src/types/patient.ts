export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
};

export type PatientWithNoSSN = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NewPatientFields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn?: unknown;
    gender: unknown;
    occupation: unknown;
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
