"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDiagnoses = void 0;
const diagnoses_1 = require("../data/diagnoses");
const getAllDiagnoses = () => {
    return diagnoses_1.diagnoses;
};
exports.getAllDiagnoses = getAllDiagnoses;
