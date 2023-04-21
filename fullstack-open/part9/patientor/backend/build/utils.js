"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const entry_1 = require("./src/types/entry");
const patient_1 = require("./src/types/patient");
//Global validation
const isString = (text) => {
    return typeof text === 'string';
};
const parseString = (string, paramName) => {
    if (!string || !isString(string)) {
        throw new Error(`Incorrect or missing ${paramName}`);
    }
    return string;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
//Patient validation
const isGender = (gender) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(patient_1.Gender).includes(gender);
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect date:${date}`);
    }
    return date;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect name:${name}`);
    }
    return name;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect SSN:${ssn}`);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect gender:${gender}`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect occupation:${occupation}`);
    }
    return occupation;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, }) => {
    const addingPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
    return addingPatient;
};
exports.toNewPatient = toNewPatient;
//Entry validation
const isEntryType = (potentialEntry) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(entry_1.EntryType).includes(potentialEntry);
};
const parseEntryType = (entryType) => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error(`Incorrect entry type: ${entryType}`);
    }
    return entryType;
};
const isRating = (potentialRating) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(entry_1.Rating).includes(potentialRating);
};
const parseRating = (rating) => {
    const values = [0, 1, 2, 3];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!values.includes(rating) || !isRating(rating)) {
        throw new Error(`Incorrect health rating ${rating}`);
    }
    return rating;
};
const isDiagnosisCodes = (param) => {
    return param.every((diagnosis) => typeof diagnosis === 'string');
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnoses codes');
    }
    return diagnosisCodes;
};
const toNewEntry = (entry) => {
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
                employerName: parseString(entry.employerName, 'employerName'),
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
exports.toNewEntry = toNewEntry;
