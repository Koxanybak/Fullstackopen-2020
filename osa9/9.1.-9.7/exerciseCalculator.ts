interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (): Result => {
  if (process.argv.length < 4) {
    throw new Error("too few arguments");
  }

  if (isNaN(Number(process.argv[2]))) {
    throw new Error("target not a number");
  }
  const target = Number(process.argv[2]);

  const period: Array<number> = [];

  for (let i = 3; i < process.argv.length; i++) {
    if (isNaN(Number(process.argv[i]))) {
      throw new Error("day not a number");
    } else {
      period.push(Number(process.argv[i]));
    }
  }

  const average: number = period.reduce((s, v) => s + v, 0) / period.length;

  let rating: number;
  if (average > target - 0.5 && average < target + 0.5) {
    rating = 2;
  } else if (average >= target + 0.5) {
    rating = 3;
  } else {
    rating = 1;
  }

  let desc: string;
  switch(rating) {
    case 1:
      desc = "very bad";
      break;
    case 2:
      desc = "ok";
      break;
    case 3:
      desc = "very nice :)";
      break;
    default:
      desc = "very bad";
  }

  return {
    periodLength: period.length,
    trainingDays: period.filter(day => day !== 0).length,
    success: average > target,
    rating,
    ratingDescription: desc,
    target,
    average,
  };
};

try {
  console.log(calculateExercises());
} catch (e) {
  console.log(e.message);
}