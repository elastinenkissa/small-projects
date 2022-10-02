"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const utils_1 = require("../services/utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = (0, patientService_1.getPatientsWithNoSSN)();
    res.status(200).json(patients);
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
exports.default = router;