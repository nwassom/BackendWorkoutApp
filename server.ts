import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';

import { connectToDatabase } from './database';
import AuthRoutes from './routes/AuthRoutes';
import WorkoutRoutes from './routes/WorkoutRoutes';

const app = express();
connectToDatabase();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json())
app.use(AuthRoutes);
app.use(WorkoutRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
	console.log(`Backend Server listening on port ${port}`);
})