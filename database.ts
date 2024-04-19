import mongoose from 'mongoose';

const databaseURL = "mongodb+srv://groot:WE_will_Get_100.@main-cluster.qga3zp6.mongodb.net/app?retryWrites=true&w=majority&appName=Main-Cluster";

export async function connectToDatabase()
{
	try
	{
		await mongoose.connect(databaseURL);
		console.log('Connected to MONGODB');
	}
	catch(error)
	{
		console.error('Error attempting to connect to database:', error);
	}
}