import Elysia from 'Elysia';
import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { registerControllers } from './server';
import {
  ErrorMessages,
  gracefulShutdown,
  requestLogger,
  bootLogger,
} from './utils';

try {
  const app = new Elysia();
  app.use(cors());
  app.use(swagger());
  app.onStop(gracefulShutdown);
  app.onResponse(requestLogger);
  app.onError(({ code, error, set }) => ErrorMessages(code, error, set));
  registerControllers(app); // user routes and middlewates
  process.on('SIGINT', app.stop);
  process.on('SIGTERM', app.stop);
  app.listen(process.env.PORT!, bootLogger);
} catch (e) {
  console.log('error booting the server');
  console.error(e);
}
