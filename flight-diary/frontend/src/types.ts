import { Weather } from '../../backend/src/types';

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
}
