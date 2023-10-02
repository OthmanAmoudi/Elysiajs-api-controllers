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
//import AnotherService from './another.service';

let TaskBody = t.Object({ title: t.String() });
let TaskResponse = t.Object({ id: t.Number(), title: t.String() });
let TaskListResponse = t.Array(t.Object({ id: t.Number(), title: t.String() }));

// step #1
class TasksController extends BaseController {
  // step #2
  routes = [];

  constructor(
    public tasksService: TasksService //public anotherService: AnotherService
  ) {
    // step #3
    super('/tasks'); // IMPORTANT: DEFINE BASE ROUTE NAME (https://localhost:3500/tasks)
  }

  // step #4
  initializeRoutes() {
    this.registerRoutes(this.routes);
  }

  // step #5 (last)
  // define a route and response for both swagger and the response type
  @Get('/', { response: TaskListResponse }) // or just @Get('/')
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
//const anotherSerice = new AnotherService();

export default new TasksController(tasksService); //,anotherSerice);
```
