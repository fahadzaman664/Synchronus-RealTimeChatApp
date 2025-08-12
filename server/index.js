import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8747;
const mongoUrl = process.env.MONGO_URL;
const dbname = process.env.DATABASE_NAME;

app.use((cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true

})))

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);



const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(
    mongoUrl, {
    dbName: dbname
}).then(() => {
    console.log('MongoDB connected successfully.');
})
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

