/*
	User Model uses the Workout Schema to have an array of workouts
	probably should change at some point
*/
import mongoose, {Schema, Document } from 'mongoose';

interface IExercise {
    name: string;
    favorite: boolean;
    muscleGroup: string[];
    sets: number;
    reps: number;
    weight: number;
};

// Define the workout object type
export interface IWorkout {
    name: string;
    time: Date; // You can use a specific type for time if needed
    color: string;
    timesCompleted: number;
    date: string; // You can use a specific type for date if needed
    exercises: IExercise[];
};

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
        color: String,
        favorite: { type: Boolean, default: false },
        timesCompleted: { type: Number, default: 0 },
        date: String,
        exercises: [{
            name: String,
            muscleGroup: [String],
            sets: Number,
            reps: Number,
            weight: Number,
        }],
    }],
});

export default mongoose.model<IUser>('User', UserSchema);