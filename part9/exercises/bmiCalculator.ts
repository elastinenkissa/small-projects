const calculateBmi = (height: number, weight: number): string => {
    if (process.argv.length < 4 || process.argv.length > 4) {
        throw new Error('Please only two numbers!');
    }
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Please input numbers!');
    }
    const meters: number = Math.pow(height / 100, 2);
    if (weight / meters < 18.5) {
        return 'Underweight';
    }
    if (weight / meters > 29.9) {
        return 'Obese';
    }
    if (weight / meters > 24.9) {
        return 'Overweight';
    }
    return 'Healthy weight';
};

const height: number = +process.argv[2];
const weight: number = +process.argv[3];

try {
    console.log(calculateBmi(height, weight));
} catch (error) {
    console.error(`Error: ${error.message}`);
}
