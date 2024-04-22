import { Request, Response } from 'express';
import User,{IUser, IWorkout} from '../models/User';

export const retrieveWorkouts = async (req: Request, res: Response): Promise<Response> => {
	const { userId } = req.params;

	try 
	{
		const user = await User.findById(userId).populate('workouts');

		if (!user)
		{
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		return res.status(200).json({ success: true, message: 'workout retrieval sucessful', workouts: user.workouts});
	}
	catch (error)
	{
		return res.status(500).json({ success: false, message: 'Error retrieving workouts', error });
	}
};

export const addWorkout = async (req: Request, res: Response): Promise<Response> => {
	const { userId } = req.params;
	const workoutData: IWorkout = req.body;

	try
	{
		if (Object.keys(workoutData).length === 0 && workoutData.constructor === Object)
		{
			return res.status(500).json({ success: false, message: 'Error adding workout: Workout empty'});
		}

		const user = await User.findById(userId);

		if (!user)
		{
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		if (!user.workouts)
		{
			user.workouts = [];
		}

		user.workouts.push(workoutData);
		await user.save();

		return res.status(200).json({success: true, message: 'New Workout added successfully'});
	}
	catch (error)
	{
		return res.status(500).json({ success: false, message: 'Error adding workout', error });
	}
};

export const editWorkout = async (req: Request, res: Response): Promise<Response> => {
	const { userId } = req.params;
  	const {oldName, workoutUpdate} = req.body;

  	try
  	{
  		if (Object.keys(workoutUpdate).length === 0 && workoutUpdate.constructor === Object)
		{
			return res.status(500).json({ success: false, message: 'Error adding workout: Workout empty'});
		}

  		const user = await User.findById(userId);

		if (!user)
		{
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		const workout = user.workouts.find(workout => workout.name === oldName);

		if (!workout)
		{
			return res.status(404).json({success: false, message: "Workout Not Found"});
		}

		Object.assign(workout, workoutUpdate);
		await user.save();

		return res.status(201).json({success: true, message: 'Workout updated successfully', updatedWorkout: workout });
  	}
  	catch (error)
  	{
  		return res.status(500).json({success: false, message: "Error updating workout", error });
  	}
};

export const deleteWorkout = async (req: Request, res: Response): Promise<Response> => {
	const { userId } = req.params;
  	const workoutName = req.query.name;

  	try
  	{
  		const user = await User.findById(userId);

		if (!user)
		{
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		const initialCount = user.workouts.length;
        user.workouts = user.workouts.filter(workout => workout.name !== workoutName);
  
        if (user.workouts.length === initialCount) {
            return res.status(404).json({ success: false, message: 'Workout not found' });
        }

        await user.save();
        return res.status(201).json({ success: true, message:'Workout deleted successfully' });
  	}
  	catch (error)
  	{
  		return res.status(500).json({success: false, message: "Error deleting workout", error });
  	}
};