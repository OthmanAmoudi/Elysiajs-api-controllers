import Elysia from 'Elysia';
import { startServer } from './server';
import { bootLogger } from './utils';

try {
  const app = new Elysia();
  startServer(app);
  process.on('beforeExit', app.stop);
  process.on('SIGINT', app.stop);
  process.on('SIGTERM', app.stop);
  app.listen(process.env.PORT!, bootLogger);
} catch (e) {
  console.log('error booting the server');
  console.error(e);
}
