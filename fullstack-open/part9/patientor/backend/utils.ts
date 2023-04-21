/* eslint-disable @typescript-eslint/no-explicit-any */
import { Diagnose } from './src/types/diagnose';
import { EntryType, NewEntry, Rating } from './src/types/entry';
import { Gender, NewPatient, NewPatientFields } from './src/types/patient';

//Global validation

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const parseString = (string: unknown, paramName: string): string => {
    if (!string || !isString(string)) {
        throw new Error(`Incorrect or missing ${paramName}`);
    }
    return string;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

//Patient validation

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

//Entry validation

const isEntryType = (potentialEntry: any): potentialEntry is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(potentialEntry);
};

const parseEntryType = (entryType: unknown): EntryType => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error(`Incorrect entry type: ${entryType}`);
    }
    return entryType;
};

const isRating = (potentialRating: any): potentialRating is Rating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Rating).includes(potentialRating);
};

const parseRating = (rating: any): Rating => {
    const values: Array<number> = [0, 1, 2, 3];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!values.includes(rating) || !isRating(rating)) {
        throw new Error(`Incorrect health rating ${rating}`);
    }
    return rating;
};

const isDiagnosisCodes = (
    param: Array<any>
): param is Array<Diagnose['code']> => {
    return param.every((diagnosis) => typeof diagnosis === 'string');
};

const parseDiagnosisCodes = (
    diagnosisCodes: Array<any>
): Array<Diagnose['code']> => {
    if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnoses codes');
    }
    return diagnosisCodes;
};

export const toNewEntry = (entry: any): NewEntry => {
    const type = parseEntryType(entry.type);
    const newEntry = {
        description: parseString(entry.description, 'description'),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist, 'specialist'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    };

    switch (type) {
        case 'HealthCheck':
            return {
                ...newEntry,
                type: type,
                healthCheckRating: parseRating(entry.healthCheckRating),
            };

        case 'OccupationalHealthcare':
            return {
                ...newEntry,
                type: type,
                employerName: parseString(
                    entry.employerName,
                    'employerName'
                ),
            };
        case 'Hospital':
            return {
                ...newEntry,
                type: type,
            };
        default:
            throw new Error('Incorrect or missing type');
    }
};
