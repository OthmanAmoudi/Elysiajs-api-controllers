import { t } from 'Elysia';
import NotesService from './notes.service';
import { Delete, Get, Post, Put, BaseController } from '../../utils';

let NoteBody = t.Object({
  content: t.String({
    error: 'content is required with minimum length of 5',
    minLength: 5,
  }),
});

let NoteResponse = t.Object({
  id: t.Number(),
  content: t.String(),
  createdAt: t.Date(),
  updateAt: t.Date(),
});

let NoteListResponse = t.Array(NoteResponse);
let NoteParams = t.Object({ id: t.Numeric() });
let NoteQuery = t.Object({ limit: t.Optional(t.Numeric()) });

class NotesController extends BaseController {
  routes = [];

  constructor(public notesService: NotesService) {
    super('/notes');
  }

  @Get('/', { query: NoteQuery, response: NoteListResponse })
  async index(ctx: any) {
    return notesService.getAllNotes(ctx.query.limit);
  }

  @Post('/', {
    body: NoteBody,
    response: NoteResponse,
  })
  async create(ctx: any) {
    return await notesService.createNote({ content: ctx.body.content });
  }

  @Get('/:id', { params: NoteParams, response: NoteResponse })
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
