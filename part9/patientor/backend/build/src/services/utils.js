"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const patient_1 = require("../types/patient");
const isString = (text) => {
    return typeof text === 'string';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
