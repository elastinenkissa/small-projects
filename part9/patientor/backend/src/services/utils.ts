import { Gender, NewPatient, NewPatientFields } from '../types/patient';

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect date:${date}`);
    }
    return date;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect name:${name}`);
    }
    return name;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect SSN:${ssn}`);
    }
    return ssn;
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect gender:${gender}`);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect occupation:${occupation}`);
    }
    return occupation;
};

export const toNewPatient = ({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
}: NewPatientFields): NewPatient => {
    const addingPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
    return addingPatient;
};
