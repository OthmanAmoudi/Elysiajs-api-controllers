import swagger from '@elysiajs/swagger';
import { TasksController } from './modules';
import { gracefulShutdown, requestLogger } from './utils';

export function startServer(app: any) {
  // middlewares
  app.onResponse(requestLogger);
  app.onStop(gracefulShutdown);
  app.use(swagger());

  //controllers
  app.use(TasksController);
  // app.use(AnotherController)
}

// TODO: handle custom middlewares in controllers
// TODO: add auth
// TODO: add database
