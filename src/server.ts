import swagger from '@elysiajs/swagger';
import { TasksController } from './modules';
import { requestLogger } from './utils';

export function bootServer(app: any) {
  // middlewates
  app.onResponse(requestLogger);
  app.use(swagger());
  //controllers
  app.use(TasksController.start());
  // app.use(AnotherController.start())
}
// TODO: handle custom middlewares in controllers
