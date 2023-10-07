import Elysia from 'Elysia';
import cors from '@elysiajs/cors';
import bearer from '@elysiajs/bearer';
import swagger from '@elysiajs/swagger';
import { registerControllers } from './server';
import {
  ErrorMessages,
  gracefulShutdown,
  requestLogger,
  bootLogger,
} from './utils';

try {
  const app = new Elysia()
    .use(cors())
    .use(swagger())
    .use(bearer())
    .onStop(gracefulShutdown)
    .onResponse(requestLogger)
    .onError(({ code, error, set }) => ErrorMessages(code, error, set));
  // user routes and middlewates
  registerControllers(app);
  process.on('SIGINT', app.stop);
  process.on('SIGTERM', app.stop);
  app.listen(process.env.PORT!, bootLogger);
} catch (e) {
  console.log('error booting the server');
  console.error(e);
}
