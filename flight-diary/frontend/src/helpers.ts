import { Weather, NewDiaryEntry, Visibility } from '../../backend/src/types';

const assertString = (val: unknown): val is string => {
  return typeof val === 'string' || val instanceof String;
};
const isString = (val: unknown): string => {
  if (!assertString(val)) throw new Error(`"${val}" is not a string`);
  return val;
};

const isDate = (val: unknown): string => {
  const date = isString(val);
  if (!Date.parse(date)) throw new Error(`"${date}" is not a date`);
  return date;
};

const assertVisibility = (val: string): val is Visibility => {
  return Object.values(Visibility)
    .map((e) => e.toString())
    .includes(val);
};

const isVisibility = (val: unknown): Visibility => {
  if (!assertString(val) || !assertVisibility(val))
    throw new Error(`"${val}" is not one of the options for visibility`);
  return val;
};

const assertWeather = (val: string): val is Weather => {
  return Object.values(Weather)
    .map((e) => e.toString())
    .includes(val);
};

const isWeather = (val: unknown): Weather => {
  if (!assertString(val) || !assertWeather(val))
    throw new Error(`"${val}" is not one of the options for weather`);

  return val;
};

export const assertDiaryEntry = (obj: unknown): NewDiaryEntry => {
  if (!(obj instanceof Object)) throw new Error('diary is malformed');
  if (
    !('date' in obj) ||
    !('visibility' in obj) ||
    !('weather' in obj) ||
    !('comment' in obj)
  )
    throw new Error('diary is missing some fields');

  return {
    date: isDate(obj.date),
    visibility: isVisibility(obj.visibility),
    weather: isWeather(obj.weather),
    comment: isString(obj.comment),
  };
};
