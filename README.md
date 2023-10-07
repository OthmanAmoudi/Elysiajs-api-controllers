# Elysia routing controllers

### modular and concise template with decorators and services (inspired by nestjs)

- Elysia RESTAPI starter example
- Decorators for GET, POST, PUT and DELETE methods
- Familiar middleware like express (beforeHandle)
- by default, all requests are logged in the console ('GET -- /swagger -- 200 2023-10-02T00:48:20.857Z')
- swagger included, everytime you register new controller,view all routes (http://localhost:3500/swagger)

example controller

```ts
import { t } from 'Elysia';
import TasksService from './tasks.service';
import { AuthRoute } from '../../middlewares';
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
    beforeHandle: AuthRoute,
  })
  async create(ctx: any) {
    return tasksService.createTask({ title: ctx.body.title });
  }

  @Get('/:id', { params: TaskParams, response: TaskResponse })
  async show(ctx: any) {
    return tasksService.getTask(ctx.params.id);
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
//step3
export default new TasksController(tasksService).start();
//in server.ts add: app.use(TasksController)
```

## Create Turso db

- make sure you already installed Turso CLI

```sh
turso db create mydatabasename
```

Get the db url

```sh
turso db show mydatabasename
```

Get the db token

```sh
turso db tokens create mydatabasename
```

Update the `.env` file with the token and url from the above commands

```sh
bun install
```

- if you want to switch to local sqlite [see this quide](https://orm.drizzle.team/docs/quick-sqlite/bun)

## Run the application

To start the development server run:

```sh
npm run dev
```

Open http://localhost:3500/ with your browser to see the result.

make sure in your tsconfig.json you have:

```
"experimentalDecorators": true
```
