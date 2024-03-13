import {
  Body,
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';
import { Request } from 'express';

@Injectable()
export class NoteService {
  constructor(@InjectModel('Notes') private noteModel: Model<Note>) {}

  async getNote(noteId: string, userId: string): Promise<Note> {
    const note = await this.noteModel.findOne({
      _id: noteId,
      createdBy: userId,
    });

    if (!note) {
      throw new NotFoundException();
    }

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.createdBy != userId) {
      throw new UnauthorizedException(
        'You dont have permission to access this note',
      );
    }

    return note;
  }

  async getAllNotes(userId: string): Promise<Note[]> {
    const notes = await this.noteModel.find({ createdBy: userId });
    return notes;
  }

  async addNote(title: string, content: string, userId: string): Promise<Note> {
    const note = await this.noteModel.create({
      title,
      content,
      createdAt: Date.now(),
      createdBy: userId,
    });
    return note;
  }

  async deleteNote(noteId: string, userId: string): Promise<void> {
    const res = await this.noteModel.deleteOne({
      _id: noteId,
      createdBy: userId,
    });

    if (!res.deletedCount) {
      throw new NotFoundException('Note not found');
    }
  }

  async updateNote(
    noteId: string,
    title: string,
    content: string,
    userId: string,
  ): Promise<void> {
    const note = await this.noteModel.findOne({
      _id: noteId,
      createdBy: userId,
    });

    if (!note) {
      throw new NotFoundException();
    }

    if (title == '' || title) {
      note.title = title;
    }

    if (content == '' || content) {
      note.content = content;
    }

    note.save();
  }
}
