import express from 'express';

import {
    addNewPatient,
    getPatient,
    getAllPatients,
} from '../services/patientService';
import { toNewPatient } from '../services/utils';
import { NewPatient, Patient, PublicPatient } from '../types/patient';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients: PublicPatient[] = getAllPatients();
    res.status(200).json(patients);
});

router.get('/:id', (req, res) => {
    const patient: Patient | undefined = getPatient(req.params.id);
    console.log('fetch');
    if (!patient) {
        return res.status(400).json({ error: 'No patient with that id.' });
    }
    return res.status(200).json(patient);
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
