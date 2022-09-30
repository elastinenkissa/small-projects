interface Result {
    periodDays: number;
    trainingDays: number;
    target: number;
    averageTime: number;
    success: boolean;
    rating: number;
    feedback: string;
}

export const calculateExercises = (
    hoursDaily: Array<number>,
    dailyTarget: number
): Result => {
    let periodDays = 0;
    let trainingDays = 0;
    let sum = 0;

    hoursDaily.map((day) => {
        if (isNaN(day)) {
            throw new Error('Please only input number of hours for each day.');
        }
        if (day > 24) {
            throw new Error('Breaking the laws of time on Earth.');
        }
        periodDays += 1;
        if (day !== 0) {
            trainingDays += 1;
        }
    });

    hoursDaily.reduce((_prevValue, currentValue) => {
        sum += currentValue;
        return sum;
    }, 0);

    const averageTime: number = sum / periodDays;

    const success: boolean = averageTime >= dailyTarget ? true : false;

    const rating: number =
        (averageTime === dailyTarget && 2) || averageTime < dailyTarget ? 1 : 3;

    const feedback = (): string => {
        switch (rating) {
            case 1:
                return 'You can do better...';
            case 3:
                return 'Great, keep it up!';
            default:
                return 'Solid';
        }
    };

    return {
        periodDays,
        trainingDays,
        target: dailyTarget,
        averageTime,
        success,
        rating,
        feedback: feedback(),
    };
};

const numberArgv: Array<number> = process.argv.map((arg) => +arg);
numberArgv.shift();
numberArgv.shift();

try {
    console.log(calculateExercises(numberArgv, 2));
} catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error(`Error: ${error.message}`);
}
