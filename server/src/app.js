const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const tripRoutes = require('./routes/trip.route');
const connectDb = require('./config/db');
const errorMiddleware = require('./middlewares/error.middleware');
require('dotenv').config();

const app = express();
connectDb();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use(errorMiddleware);

module.exports = app;
