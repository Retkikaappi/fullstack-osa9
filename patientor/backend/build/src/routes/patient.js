"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get('/', (_req, resp) => {
    resp.send(patientService_1.default.getPublicPatientRecords());
});
const patientHandler = (req, _resp, next) => {
    try {
        utils_1.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorHandler = (error, _req, resp, next) => {
    if (error instanceof zod_1.z.ZodError) {
        // voisi vääntää error.issues[0].message jotta viesti näyttäisi paremmalta frontissa, mutta ole vaivan arvoista
        resp.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post('/', patientHandler, (req, resp) => {
    const addedPatient = patientService_1.default.createNewPatient(req.body);
    resp.json(addedPatient);
});
router.use(errorHandler);
exports.default = router;
