import dotenv from "dotenv";
import express from 'express';
import cors from "cors";

import { connectDB } from "./config/db.js";

import taskRoute from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB()

const app=express();
app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  console.log("Welcome to the Task API")
  res.send('Welcome to the Task API');
});
app.use('/api/v1/tasks',taskRoute);
app.use('/api/v1/users',userRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
  
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }
  
    res.status(500).json({ error: 'Something went wrong!' });
  });
  

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})