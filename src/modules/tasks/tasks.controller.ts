import { t } from 'Elysia';
import TasksService from './tasks.service';
import { Delete, Get, Post, Put, BaseController } from '../../utils';

let TaskBody = t.Object({ title: t.String() });
let TaskResponse = t.Object({ id: t.Number(), title: t.String() });
let TaskListResponse = t.Array(t.Object({ id: t.Number(), title: t.String() }));

class TasksController extends BaseController {
  routes = [];

  constructor(public tasksService: TasksService) {
    super('/tasks');
  }

  @Get('/', { response: TaskListResponse })
  async index() {
    return tasksService.getAllTasks();
  }

  @Post('/', {
    body: TaskBody,
    response: TaskResponse,
  })
  async create(ctx: any) {
    return tasksService.createTask({ title: ctx.body.title });
  }

  @Get('/:id', { response: TaskResponse })
  async show(ctx: any) {
    return tasksService.getTask(Number(ctx.params.id));
  }

  @Put('/:id', { response: TaskResponse })
  async update(ctx: any) {
    return tasksService.updateTask({
      id: Number(ctx.params.id),
      title: ctx.body.title,
    });
  }

  @Delete('/:id')
  async destroy(ctx: any) {
    return tasksService.deleteTask(Number(ctx.params.id));
  }
}

const tasksService = new TasksService();

export default new TasksController(tasksService);
