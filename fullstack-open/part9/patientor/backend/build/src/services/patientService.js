"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewPatient = exports.getPatientsWithNoSSN = exports.getPatient = exports.getAllPatients = void 0;
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getAllPatients = () => {
    return patients_1.default;
};
exports.getAllPatients = getAllPatients;
const getPatient = (id) => {
    const patient = patients_1.default.find((patient) => patient.id === id);
    return patient;
};
exports.getPatient = getPatient;
const getPatientsWithNoSSN = () => {
    return patients_1.default.map((patient) => {
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
    patients_1.default.push(addingPatient);
    return addingPatient;
};
exports.addNewPatient = addNewPatient;
