import swagger from '@elysiajs/swagger';
import { TasksController } from './modules';
import { requestLogger, registerControllers } from './utils';

export function bootServer(app: any) {
  // middlewates
  app.onResponse(requestLogger);
  app.use(swagger());
  //controllers
  registerControllers(app, [TasksController]); 
  // or 
  // app.use(TasksController.start())
  // app.use(AnotherController.start())
  
// TODO: handle custom middlewares in controllers
}
