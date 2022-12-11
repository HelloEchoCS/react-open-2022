const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) throw new Error('wrong input!');

  const bmi: number = weight / ((height / 100)^2);
  if (bmi < 18.5) return 'Underweight';
  if (bmi > 24.9) return 'Overweight';
  return 'Normal (healthy weight)';
}

export default calculateBmi;