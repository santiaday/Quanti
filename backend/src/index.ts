// src/index.ts
import express from 'express';
import cors from 'cors';
import connectDB from './utils/db';
import eventRoutes from './routes/events/eventRoutes';
import dotenv from 'dotenv';
import path from 'path';
import 'tsconfig-paths/register';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', eventRoutes);

app.use('/public', express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
