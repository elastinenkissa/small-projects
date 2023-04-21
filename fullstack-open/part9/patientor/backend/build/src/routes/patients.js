"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const entryService_1 = require("../services/entryService");
const patientService_1 = require("../services/patientService");
const utils_1 = require("../../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = (0, patientService_1.getAllPatients)();
    res.status(200).json(patients);
});
router.get('/:id', (req, res) => {
    const patient = (0, patientService_1.getPatient)(req.params.id);
    if (!patient) {
        return res.status(400).json({ error: 'No patient with that id.' });
    }
    return res.status(200).json(patient);
});
router.post('/', (req, res) => {
    const patient = (0, utils_1.toNewPatient)({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        ssn: req.body.ssn,
        gender: req.body.gender,
        occupation: req.body.occupation,
    });
    const addedPatient = (0, patientService_1.addNewPatient)(patient);
    res.status(200).json(addedPatient);
});
router.post('/:id/entries', (req, res) => {
    const entry = (0, utils_1.toNewEntry)(req.body);
    const addingEntry = (0, entryService_1.addEntry)(entry, req.params.id);
    res.status(201).json(addingEntry);
});
exports.default = router;
