import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { NoteSchema } from './note.schema';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notes', schema: NoteSchema }])],
  controllers: [NoteController],
  providers: [
    NoteService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class NoteModule {}
