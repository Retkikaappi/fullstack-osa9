"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (val) => {
    return typeof val === 'string' || val instanceof String;
};
const isValid = (val) => {
    if (!isString(val)) {
        throw new Error(`"${val}" is not a string`);
    }
    return val;
};
const isDate = (date) => {
    if (!Date.parse(isValid(date))) {
        throw new Error('date is invalid');
    }
    return date;
};
const inGenders = (val) => {
    return Object.values(types_1.Gender)
        .map((e) => e.toString())
        .includes(val);
};
const isGender = (val) => {
    const gender = isValid(val);
    if (!inGenders(gender)) {
        throw new Error(`${val} is not a gender`);
    }
    return gender;
};
const validatePatient = (patient) => {
    if (!patient || typeof patient !== 'object') {
        throw new Error('invalid arguments for creating a patient');
    }
    if ('name' in patient &&
        'ssn' in patient &&
        'dateOfBirth' in patient &&
        'gender' in patient &&
        'occupation' in patient) {
        const newPatient = {
            name: isValid(patient.name),
            ssn: isValid(patient.ssn),
            dateOfBirth: isDate(patient.dateOfBirth),
            gender: isGender(patient.gender),
            occupation: isValid(patient.occupation),
        };
        return newPatient;
    }
    throw new Error('missing arguments for creating a patient');
};
exports.default = validatePatient;
