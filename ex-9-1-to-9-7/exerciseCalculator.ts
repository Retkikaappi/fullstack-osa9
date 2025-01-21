import { nanCheck } from './helpers';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Inputs {
  target: number;
  weekly: number[];
}

const calculateExercises = (target: number, weekly: number[]): Result => {
  const periodLength = weekly.length;
  const trainingDays = weekly.filter((e) => e > 0);
  const sum = trainingDays.reduce((a, b) => a + b);
  const average = sum / periodLength;
  const diff = target - average;
  const success = average >= target;
  let rating, ratingDescription;

  if (diff <= -0.5) {
    rating = 5;
    ratingDescription = 'you did great';
  } else if (diff <= -0.25) {
    rating = 4;
    ratingDescription = 'you did good';
  } else if (diff >= 0.07) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (diff >= 0.25) {
    rating = 1;
    ratingDescription = 'do better';
  } else {
    rating = 3;
    ratingDescription = 'you tried';
  }

  return {
    periodLength,
    trainingDays: trainingDays.length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parser = (args: string[]): Inputs => {
  if (args.length < 4) throw new Error('missing inputs');
  const target = args[2];
  const weekly = args.slice(3, args.length);
  if (nanCheck(target) || weekly.some(nanCheck))
    throw new Error('inputs are not numbers');
  if (Number(target) < 0 || weekly.some((e) => Number(e) < 0))
    throw new Error('negative numbers not allowed');

  return {
    target: Number(target),
    weekly: weekly.map((e) => Number(e)),
  };
};

try {
  const { target, weekly } = parser(process.argv);
  console.log(calculateExercises(target, weekly));
} catch (error: unknown) {
  let errMsg = 'unknown error';
  if (error instanceof Error) {
    errMsg = 'error: ' + error.message;
  }
  console.log(errMsg);
}
