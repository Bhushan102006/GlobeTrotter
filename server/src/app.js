require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const tripRoutes = require('./routes/trip.route');
const connectDb = require('./config/db');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
connectDb();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : '',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    const cleanOrigin = origin ? origin.replace(/\/$/, '') : '';
    if (!origin || allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      console.warn(`CORS Blocked: Origin "${cleanOrigin}" is not in allowed origins:`, allowedOrigins);
      callback(new Error(`Not allowed by CORS: Origin "${cleanOrigin}" is not allowed`));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use(errorMiddleware);

module.exports = app;

