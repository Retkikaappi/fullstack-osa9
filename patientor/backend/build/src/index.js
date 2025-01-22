"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnose_1 = __importDefault(require("./routes/diagnose"));
const patient_1 = __importDefault(require("./routes/patient"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/api/ping', (_req, resp) => {
    console.log('ping');
    resp.send('pong');
    return;
});
app.use('/api/diagnoses', diagnose_1.default);
app.use('/api/patients', patient_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
