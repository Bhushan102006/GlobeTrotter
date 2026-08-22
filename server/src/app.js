const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const connectDb = require('./config/db');
const errorMiddleware = require('./middlewares/error.middleware');
require('dotenv').config();

const app = express();
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
app.use(errorMiddleware);

module.exports = app;
