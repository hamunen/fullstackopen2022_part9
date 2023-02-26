interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: number[], target: number): ExerciseResult => {
  const avgExerciseHours =
    days.reduce((sum, day) => sum + day, 0) / days.length;

  const successFactor = avgExerciseHours / target;
  let rating = 1;
  let ratingDescription = '';
  if (successFactor < 0.75) {
    rating = 1;
    ratingDescription = 'very bad, work harder fatty';
  } else if (successFactor < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'You reached the target! Well done :)';
  }

  const result = {
    periodLength: days.length,
    trainingDays: days.filter((d) => d !== 0).length,
    success: successFactor >= 1,
    rating,
    ratingDescription,
    target,
    average: avgExerciseHours,
  };

  return result;
};

interface ExerciseInput {
  target: number;
  days: number[];
}

const parseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Target was not a number!');

  const days = args.slice(3).map((d) => {
    const num = Number(d);
    if (isNaN(num)) throw new Error(`Input ${d} was not a number!`);
    return num;
  });

  return {
    target,
    days,
  };
};

try {
  const { target, days } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
