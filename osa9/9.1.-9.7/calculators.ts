interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercisesForExpress = (period: Array<number>, target: number): Result => {
  if (!period || !target) {
    throw new Error("parameters missing");
  }

  if (isNaN(Number(target))) {
    throw new Error("malformatted parameters");
  }
  target = Number(target);

  const periodToUse: Array<number> = [];

  if (!period.length || period.length === 0) {
    throw new Error("parameters missing");
  }

  for (let i = 0; i < period.length; i++) {
    if (isNaN(Number(period[i]))) {
      throw new Error("malformatted parameters");
    } else {
      periodToUse.push(Number(period[i]));
    }
  }

  const average: number = periodToUse.reduce((s, v) => s + v, 0) / periodToUse.length;

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
    periodLength: periodToUse.length,
    trainingDays: periodToUse.filter(day => day !== 0).length,
    success: average > target,
    rating,
    ratingDescription: desc,
    target,
    average,
  };
};

export const calculateBmiForExpress = (height: number, weight: number): string => {
  if (!height || !weight) {
    throw new Error("too few arguments");
  }

  if (isNaN(Number(height))) {
    throw new Error("height not a number");
  }
  height = Number(height);

  if (isNaN(Number(weight))) {
    throw new Error("weight not a number");
  }
  weight = Number(weight);

  const bmi: number = weight / Math.pow(height / 100, 2);

  if (bmi >= 20 && bmi <= 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 20) {
    return "Underweight";
  } else {
    return "Overweight";
  }
};