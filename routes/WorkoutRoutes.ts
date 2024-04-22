import { Router } from 'express';
import { retrieveWorkouts, addWorkout, editWorkout, deleteWorkout } from '../controllers/WorkoutController';

const router = Router();

router.get('/users/:userId/workouts', retrieveWorkouts);
router.post('/users/:userId/workouts', addWorkout);
router.patch('/users/:userId/workouts', editWorkout);
router.delete('/users/:userId/workouts', deleteWorkout);

export default router;