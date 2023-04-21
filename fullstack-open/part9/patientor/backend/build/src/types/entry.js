"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryType = exports.Rating = void 0;
var Rating;
(function (Rating) {
    Rating[Rating["Healthy"] = 0] = "Healthy";
    Rating[Rating["LowRisk"] = 1] = "LowRisk";
    Rating[Rating["HighRisk"] = 2] = "HighRisk";
    Rating[Rating["CriticalRisk"] = 3] = "CriticalRisk";
})(Rating = exports.Rating || (exports.Rating = {}));
var EntryType;
(function (EntryType) {
    EntryType["HealthCheck"] = "HealthCheck";
    EntryType["Hospital"] = "Hospital";
    EntryType["OccupationalHealthcare"] = "OccupationalHealthcare";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
