import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { Request } from 'express';
import { Note } from './note.schema';

@Controller('/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':id')
  async getNote(@Req() req: Request, @Param('id') noteId: string) {
    const note = await this.noteService.getNote(noteId, req['user'].id);
    return note;
  }

  @Get()
  async getAllNotes(@Req() req: Request) {
    const notes = await this.noteService.getAllNotes(req['user'].id);
    return notes;
  }

  @Post()
  async addNote(
    @Req() req: Request,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<Note> {
    const note = await this.noteService.addNote(title, content, req['user'].id);
    return note;
  }

  @Delete(':id')
  async deleteNote(@Req() req: Request, @Param('id') noteId: string) {
    await this.noteService.deleteNote(noteId, req['user'].id);
  }

  @Patch(':id')
  async updateNote(
    @Req() req: Request,
    @Param('id') noteId: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    await this.noteService.updateNote(noteId, title, content, req['user'].id);
  }
}
