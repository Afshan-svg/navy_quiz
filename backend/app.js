import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import divisionRoutes from './routes/divisionRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import certificateRouter from './routes/certificateRoutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb+srv://afshankhan:NEj0EFBxGL7Ey38F@navy.kdbuevf.mongodb.net/?retryWrites=true&w=majority&appName=navy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', userRoute);
app.use('/api/divisions', divisionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api', certificateRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
