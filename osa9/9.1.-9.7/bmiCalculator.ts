const calculateBmi = (): string => {
  if (process.argv.length < 4) {
    throw new Error("too few arguments");
  }

  if (isNaN(Number(process.argv[2]))) {
    throw new Error("height not a number");
  }
  const height = Number(process.argv[2]);

  if (isNaN(Number(process.argv[3]))) {
    throw new Error("weight not a number");
  }
  const weight = Number(process.argv[3]);

  const bmi: number = weight / Math.pow(height / 100, 2);

  if (bmi >= 20 && bmi <= 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 20) {
    return "Underweight";
  } else {
    return "Overweight";
  }
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

try {
  console.log(calculateBmi());
} catch (e) {
  console.log(e.message);
}