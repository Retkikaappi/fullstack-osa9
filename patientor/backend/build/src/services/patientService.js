"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPublicPatientRecords = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const createNewPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    console.log('new patient', newPatient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getPublicPatientRecords, createNewPatient };
