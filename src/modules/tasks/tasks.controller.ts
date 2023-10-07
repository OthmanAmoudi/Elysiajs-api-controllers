import { t } from 'Elysia';
import TasksService from './tasks.service';
import { Delete, Get, Post, Put, BaseController } from '../../utils';

let TaskBody = t.Object({
  title: t.String({
    error: 'title is required with minimum length of 3',
    minLength: 3,
  }),
});
let TaskResponse = t.Object({ id: t.Number(), title: t.String() });
let TaskListResponse = t.Array(TaskResponse);
let TaskParams = t.Object({ id: t.Numeric() });
let TaskQuery = t.Object({ limit: t.Optional(t.Numeric()) });

class TasksController extends BaseController {
  routes = [];

  constructor(public tasksService: TasksService) {
    super('/tasks');
  }

  @Get('/', { query: TaskQuery, response: TaskListResponse })
  async index(ctx: any) {
    return tasksService.getAllTasks(ctx.query.limit);
  }

  @Post('/', {
    body: TaskBody,
    response: TaskResponse,
  })
  async create(ctx: any) {
    return tasksService.createTask({ title: ctx.body.title });
  }

  @Get('/:id', { params: TaskParams, response: TaskResponse })
  async show(ctx: any) {
    return tasksService.getTask(ctx.params.id); // t.Numeric() will convert '3' to 3
  }

  @Put('/:id', { params: TaskParams, body: TaskBody, response: TaskResponse })
  async update(ctx: any) {
    return tasksService.updateTask({
      id: ctx.params.id,
      title: ctx.body.title,
    });
  }

  @Delete('/:id')
  async destroy(ctx: any) {
    return tasksService.deleteTask(Number(ctx.params.id));
  }
}

const tasksService = new TasksService();

export default new TasksController(tasksService).start();
