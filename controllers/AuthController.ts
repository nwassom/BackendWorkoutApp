import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User, {IUser} from '../models/User';

export const signup = async (req: Request, res: Response): Promise<Response> => {

	console.log(req.body);
	const { username, email, password, birthday, heightInches, weight, gender, goal } = req.body;
	try 
	{
		const hashedPassword = await bcrypt.hash(password, 10);
		const lowerUser = username.toLowerCase();

		const newUser = new User({
			email,
			username: lowerUser,
			password: hashedPassword,
			birthday,
			heightInches,
			weight,
			gender,
			goal,
		});

		await newUser.save();

		return res.status(201).json({success: true, message: 'User created successfully'});
	}
	catch (error)
	{
		console.error(error);
		return res.status(500).json({success: false, message: 'Server error'});
	}
};

export const login = async (req: Request, res: Response): Promise<Response> => {
	console.log(req.body);

	const { usernameOrEmail, password } = req.body;

	const lowerCaseUsernameEmail = usernameOrEmail.toLowerCase();

	const userByEmail: IUser | null = await User.findOne({ email: lowerCaseUsernameEmail });

	if (userByEmail)
	{
		const isValidPassword = await bcrypt.compare(password, userByEmail.password);
		if (isValidPassword)
		{
			return res.status(200).json({success: true, message: 'Login successful', userByEmail});
		}
	}

	const user: IUser | null = await User.findOne({
		$or: [{ username: lowerCaseUsernameEmail }, { email: lowerCaseUsernameEmail }],
	});

	console.log(user);
	if (!user)
	{
		return res.status(400).json({success: false, message: 'Invalid Username'});
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword)
	{
		return res.status(400).json({success: false, message: 'Invalid Password'});
	}

	return res.status(200).json({success: true, message: 'Login successful', user});
};