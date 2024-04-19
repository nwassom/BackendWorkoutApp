const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

import { connectToDatabase } from './database';
import AuthRoutes from './routes/AuthRoutes';

dotenv.config();

const app = express();
connectToDatabase();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://localhost:19002' }));

app.use(bodyParser.json());

app.use(AuthRoutes);

app.listen(port, () => {
	console.log(`Backend Server listening on port ${port}`);
})