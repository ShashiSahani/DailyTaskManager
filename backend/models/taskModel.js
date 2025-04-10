import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  completed: {
    type: Boolean,
    required: [true, 'Completed status is required (true or false)'],
  },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
