import { Document } from 'mongoose';

export interface IExercise extends Document {
    exerciseMonday: string[];
    exerciseTuesday: string[];
    exerciseWednesday: string[];
    exerciseThursday: string[];
    exerciseFriday: string[];
    exerciseSaturday: string[];
    exerciseSunday: string[];
    exerciseStart: string[];
    exerciseEnd: string[];
    userId: string;
}