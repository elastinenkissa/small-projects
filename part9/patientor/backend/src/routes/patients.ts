import express from 'express';

import {
    getPatientsWithNoSSN,
    addNewPatient,
} from '../services/patientService';
import { toNewPatient } from '../services/utils';
import { NewPatient, Patient, PatientWithNoSSN } from '../types/patient';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients: PatientWithNoSSN[] = getPatientsWithNoSSN();
    res.status(200).json(patients);
});

router.post('/', (req, res) => {
    const patient: NewPatient = toNewPatient({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        ssn: req.body.ssn,
        gender: req.body.gender,
        occupation: req.body.occupation,
    });
    const addedPatient: Patient = addNewPatient(patient);
    res.status(200).json(addedPatient);
});

export default router;
