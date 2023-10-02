import Elysia from 'Elysia';
import { bootServer } from './server';
import { bootLogger, gracefulShutdown } from './utils';

const app = new Elysia();
app.on('stop', gracefulShutdown);
bootServer(app);
process.on('beforeExit', app.stop);
process.on('SIGINT', app.stop);
process.on('SIGTERM', app.stop);
app.listen(process.env.PORT || 3000, bootLogger);
