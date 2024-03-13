import mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled',
  },
  content: {
    type: String,
    default: '',
  },
  createdAt: Date,
  createdBy: mongoose.Schema.Types.ObjectId,
});

export interface Note extends mongoose.Document {
  title: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}
