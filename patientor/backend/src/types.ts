export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type publicPatientRecord = Omit<PatientRecord, 'ssn'>;
