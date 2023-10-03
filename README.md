# Elysia routing controllers

### modular and concise template with decorators and services (inspired by nestjs)

- Elysia RESTAPI starter example
- Decorators for GET, POST, PUT and DELETE methods
- by default, all requests are logged in the console ('GET -- /swagger -- 200 2023-10-02T00:48:20.857Z')
- swagger included everytime you extend the base controller, to view registered routes go to (http://localhost:3500/swagger)

first

```
bun install
```

then

```
npm run dev
```

example controller

```ts
import { t } from 'Elysia';
import TasksService from './tasks.service';
import { Delete, Get, Post, Put, BaseController } from '../../utils';

let TaskBody = t.Object({ title: t.String() });
let TaskResponse = t.Object({ id: t.Number(), title: t.String() });
let TaskListResponse = t.Array(TaskResponse);
let TaskParams = t.Object({ id: t.Numeric() });
let TaskQuery = t.Object({ limit: t.Optional(t.Numeric()) });

class TasksController extends BaseController {
  routes = []; // step 1

  constructor(public tasksService: TasksService) {
    super('/tasks'); // step 2
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
    return tasksService.getTask(ctx.params.id);
  }

  @Put('/:id', { body: TaskBody, response: TaskResponse })
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
//const anotherSerice = new AnotherService();
//step3
export default new TasksController(tasksService).start(); //import it in server.ts like app.use(TasksController)
// export default new TasksController(tasksService,anotherSerice).start();
```
