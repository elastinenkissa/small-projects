import express from 'express';

import { getAllDiagnoses } from '../services/diagnoseService';
import { Diagnose } from '../types/diagnose';

const router = express.Router();

router.get('/', (_req, res) => {
    const diagnoses: Diagnose[] = getAllDiagnoses();
    res.status(200).json(diagnoses);
});

export default router;
