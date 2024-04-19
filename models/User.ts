/*
	User Model uses the Workout Schema to have an array of workouts
	probably should change at some point
*/
import mongoose, {Schema, Document } from 'mongoose';

interface IExercise {
    name: string;
    muscleGroup: string[];
    sets: number;
    reps: number[];
    weight: number[];
    difficulty: number;
}

interface IWorkout {
    name: string;
    time: Date;
    difficulty: number;
    favorite: boolean;
    color: string;
    timesCompleted: number;
    date: Date;
    exercises: IExercise[];
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    birthday: Date;
    gender: string;
    heightInches: number;
    weight: number;
    goal: string;
    workouts: IWorkout[];
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    heightInches: { type: Number, required: true },
    weight: { type: Number, required: true },
    goal: { type: String, required: true },
    workouts: [{
        name: String,
        time: { type: Date, default: Date.now },
        difficulty: Number,
        favorite: { type: Boolean, default: false },
        color: String,
        timesCompleted: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
        exercises: [{
            name: String,
            muscleGroup: [String],
            sets: Number,
            reps: [Number],
            weight: [Number],
            difficulty: Number,
        }],
    }],
});

export default mongoose.model<IUser>('User', UserSchema);