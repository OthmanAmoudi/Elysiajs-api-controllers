import Elysia from 'Elysia';
import { TasksController, NotesController } from './modules';

export function registerControllers(app: Elysia) {
  app.use(TasksController); // without database
  app.use(NotesController); // with database
  // app.use(NotesController); // with auth middleware + database
}

// TODO: add auth
