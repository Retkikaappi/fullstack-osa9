import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const getAll = async () => {
  const resp = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return resp.data;
};

export default { getAll };
