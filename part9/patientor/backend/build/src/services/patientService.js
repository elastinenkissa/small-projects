"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewPatient = exports.getPatientsWithNoSSN = exports.getAllPatients = void 0;
const patients_1 = require("../data/patients");
const uuid_1 = require("uuid");
const getAllPatients = () => {
    return patients_1.patients;
};
exports.getAllPatients = getAllPatients;
const getPatientsWithNoSSN = () => {
    return patients_1.patients.map((patient) => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
        };
    });
};
exports.getPatientsWithNoSSN = getPatientsWithNoSSN;
const addNewPatient = (patient) => {
    const addingPatient = {
        id: (0, uuid_1.v4)(),
        ...patient,
    };
    patients_1.patients.push(addingPatient);
    return addingPatient;
};
exports.addNewPatient = addNewPatient;
