import express from 'express';
import { addEntry } from '../services/entryService';

import {
    addNewPatient,
    getPatient,
    getAllPatients,
} from '../services/patientService';
import { toNewEntry, toNewPatient } from '../../utils';
import { NewEntry } from '../types/entry';
import { NewPatient, Patient, PublicPatient } from '../types/patient';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients: PublicPatient[] = getAllPatients();
    res.status(200).json(patients);
});

router.get('/:id', (req, res) => {
    const patient: Patient | undefined = getPatient(req.params.id);
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

router.post('/:id/entries', (req, res) => {
    const entry: NewEntry = toNewEntry(req.body);
    const addingEntry = addEntry(entry, req.params.id);
    res.status(201).json(addingEntry);
});

export default router;
