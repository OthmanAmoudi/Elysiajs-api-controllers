import Elysia from 'Elysia';
import { TasksController, NotesController } from './modules';

export function registerControllers(app: Elysia) {
  // middlewares

  //controllers
  app.use(TasksController); // without database
  app.use(NotesController); // with database
}

// TODO: handle custom middlewares in controllers
// TODO: add auth
