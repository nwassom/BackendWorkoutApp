"use strict";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
try {
    dotenv.config();
    const app = express();
    const port = process.env.PORT || 3800;
    app.use(cors({ origin: 'https://localhost:19002' }));
    app.use(bodyParser.json());
    app.listen(port, () => {
        console.log(`Backend Server listening on port ${port}`);
    });
}
catch (error) {
    console.error(error);
}
