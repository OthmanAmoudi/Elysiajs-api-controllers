import NotesService from './notes.service';
import { Delete, Get, Post, Put, BaseController, useBefore } from '../../utils';
import {
  NoteBody,
  NoteQuery,
  NoteParams,
  NoteResponse,
  NoteListResponse,
  FullNoteResponse,
} from './notes.dto';
import { protectedRoute } from '../../middlewares';

class NotesController extends BaseController {
  routes = [];

  constructor(public notesService: NotesService) {
    super('/notes');
  }

  @Get('/', {
    query: NoteQuery,
    response: NoteListResponse,
    // beforeHandle: protectedRoute,
  })
  async index(ctx: any) {
    return notesService.getAllNotes(ctx.query.limit);
  }

  @Post('/', {
    body: NoteBody,
    response: FullNoteResponse,
  })
  async create(ctx: any) {
    return await notesService.createNote({ content: ctx.body.content });
  }

  @Get('/:id', { params: NoteParams, response: FullNoteResponse })
  async show(ctx: any) {
    return notesService.getNote(ctx.params.id);
  }

  @Put('/:id', { params: NoteParams, body: NoteBody, response: NoteResponse })
  async update(ctx: any) {
    return notesService.updateNote({
      id: ctx.params.id,
      content: ctx.body.content,
    });
  }

  @Delete('/:id', { params: NoteParams })
  async destroy(ctx: any) {
    notesService.deleteNote(ctx.params.id);
  }
}

const notesService = new NotesService();

export default new NotesController(notesService).start();
