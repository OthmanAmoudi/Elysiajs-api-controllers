import swagger from '@elysiajs/swagger';
import { TasksController } from './modules';
import { requestLogger, registerControllers } from './utils';

export function bootServer(app: any) {
  app.onResponse(requestLogger);
  app.use(swagger());
  registerControllers(app, [TasksController]); // or register controllers manually: app.use(TasksController.start())
  
}
