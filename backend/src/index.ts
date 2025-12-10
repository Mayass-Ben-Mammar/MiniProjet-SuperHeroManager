import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import heroRoutes from './routes/heroRoutes';
import authRoutes from './routes/authRoutes';
import { seedDatabase } from './utils/seedDatabase';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();

app.use('/api/heroes', heroRoutes);
app.use('/api/auth', authRoutes);

// Seed la base de données au démarrage (optionnel, à commenter après le premier lancement)
seedDatabase();

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
