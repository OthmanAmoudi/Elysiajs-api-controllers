# Elysia-routing-controllers
- Elysia RESTAPI example with routing controllers and decorators
- Decorators for GET, POST, PUT and DELETE methods  
- by default, all requests are logged in the console ('GET -- /swagger -- 200 2023-10-02T00:48:20.857Z') 
- swagger included at see all registered routes go to (http://localhost:3500/swagger)
```ts
import { t } from 'Elysia';
import TasksService from './tasks.service';
import { Delete, Get, Post, Put, BaseController } from '../../utils';
//import AnotherService from './another.service';

let TaskBody = t.Object({ title: t.String() });
let TaskResponse = t.Object({ id: t.Number(), title: t.String() });
let TaskListResponse = t.Array(t.Object({ id: t.Number(), title: t.String() }));

class TasksController extends BaseController {
  routes = [];

  constructor(
  public tasksService: TasksService,
  //public anotherService: AnotherService
) {
    super('/tasks'); // IMPORTANT: DEFINE BASE ROUTE NAME (https://localhost:3500/tasks)
  }

  initializeRoutes() {
    this.registerRoutes(this.routes);
  }

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

export default new TasksController(tasksService)//,anotherSerice);
```
