interface Result {
    periodDays: number;
    trainingDays: number;
    target: number;
    averageTime: number;
    success: boolean;
    rating: number;
    feedback: string;
}

const calculateExercises = (hoursDaily: Array<number>, dailyTarget: number): Result => {
    let periodDays: number = 0;
    let trainingDays: number = 0;
    let sum: number = 0;

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

    const averageTimeFunc: number = hoursDaily.reduce(
        (prevValue, currentValue) => {
            sum += currentValue;
            return sum;
        },
        0
    );

    const averageTime: number = sum / periodDays;

    const success: boolean = averageTime >= dailyTarget ? true : false;

    const rating: number =
        (averageTime === dailyTarget && 2) || averageTime < dailyTarget ? 1 : 3;

    const feedback = (): string => {
        switch (rating) {
            case 1:
                return 'You can do better...';
            case 2:
                return 'Solid.';
            case 3:
                return 'Great, keep it up!';
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
    console.error(`Error: ${error.message}`);
}
