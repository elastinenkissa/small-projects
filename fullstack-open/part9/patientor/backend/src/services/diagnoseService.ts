import { diagnoses } from '../data/diagnoses';
import { Diagnose } from '../types/diagnose';

export const getAllDiagnoses = (): Diagnose[] => {
    return diagnoses;
};
