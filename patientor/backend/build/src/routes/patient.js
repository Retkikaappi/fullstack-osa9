"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, resp) => {
    resp.send(patientService_1.default.getPublicPatientRecords());
});
router.post('/', (req, resp) => {
    try {
        const validatedPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.createNewPatient(validatedPatient);
        resp.json(addedPatient);
    }
    catch (error) {
        let errMsg = 'unknown error';
        if (error instanceof Error) {
            errMsg = error.message;
        }
        resp.status(400).send(errMsg);
    }
});
exports.default = router;
