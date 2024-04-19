import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User, {IUser} from '../models/User';

export const signup = async (req: Request, res: Response): Promise<void> => {

	const { username, email, password, birthday, heightInches, weight, gender, goal } = req.body;

	try 
	{
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
			birthday,
			heightInches,
			weight,
			gender,
			goal,
		});
		await newUser.save();

		res.status(201).json({message: 'User created successfully'});
	}
	catch (error)
	{
		console.error(error);
		res.status(500).json({message: 'Server error'});
	}
}