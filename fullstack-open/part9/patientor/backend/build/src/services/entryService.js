"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntry = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
// export const addEntry = (newEntry: NewEntry, patientId: string): Entry => {
//     const entry: Entry = {
//         id: uuid(),
//         ...newEntry,
//     };
//     const modifyingPatient: Patient | undefined = patients.find(
//         (patient: Patient) => patient.id === patientId
//     );
//     const modifyingPatientIndex: number = patients.indexOf(modifyingPatient!);
//     modifyingPatient?.entries?.push(entry);
//     patients.splice(modifyingPatientIndex, 1, modifyingPatient!);
//     return entry;
// };
const addEntry = (newEntry, patientId) => {
    const patient = patients_1.default.find((patient) => patient.id === patientId);
    if (patient) {
        const addedEntry = {
            ...newEntry,
            id: (0, uuid_1.v1)(),
        };
        patient.entries?.push(addedEntry);
        return addedEntry;
    }
    else {
        throw new Error(`No patient with ${patientId} found`);
    }
};
exports.addEntry = addEntry;
