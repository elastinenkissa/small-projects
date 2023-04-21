/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    try {
        const bmi: string = calculateBmi(height, weight);
        res.status(200).json({ weight, height, bmi });
    } catch {
        res.status(400).json({ error: 'malformatted parameters' });
    }
});

app.post('/exercises', (req, res) => {
    const dailyExercises: Array<number> = req.body.dailyExercises;
    const target = Number(req.body.target);

    try {
        const result = calculateExercises(dailyExercises, target);
        res.status(201).json(result);
    } catch {
        res.status(400).json({ error: 'malformatted parameters' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
