import { nanCheck } from './helpers';

interface BmiInputs {
  h: number;
  w: number;
}

const calculateBmi = (h: number, w: number): string => {
  const bmi = w / ((h / 100) * (h / 100));

  if (bmi <= 18.4) {
    return 'underweight range';
  } else if (bmi >= 25.0) {
    return 'overweight range';
  }
  return 'normal range';
};

const parser = (args: string[]): BmiInputs => {
  if (args.length < 4 || args.length > 4)
    throw new Error('incorrect amount of arguments');

  if (nanCheck(args[2]) || nanCheck(args[3]))
    throw new Error('inputs are not numbers');
  else if (Number(args[2]) < 0 || Number(args[3]) < 0)
    throw new Error('inputs cannot be zero or negative');

  return {
    h: Number(args[2]),
    w: Number(args[3]),
  };
};

try {
  const { h, w } = parser(process.argv);
  console.log(calculateBmi(h, w));
} catch (error: unknown) {
  let errMsg = 'unknown error';
  if (error instanceof Error) {
    errMsg = 'Error: ' + error.message;
  }
  console.log(errMsg);
}
