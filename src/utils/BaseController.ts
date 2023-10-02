import { Elysia } from 'Elysia';

interface Route {
  method: string;
  path: string;
  handler: (...args: any[]) => any;
  responseOptions?: Record<string, any>;
}

abstract class BaseController {
  app: any;
  basePath: string;

  // abstract initializeRoutes(): void;
  abstract routes: Route[];

  constructor(basePath: string) {
    this.app = new Elysia();
    this.basePath = basePath;
    this.initializeRoutes();
  }

  start() {
    return this.app;
  }

  initializeRoutes() {
    this.registerRoutes(this.routes);
  }

  registerRoutes(routes: Route[]) {
    routes.forEach((route) =>
      this.app[route.method](`${this.basePath}${route.path}`, route.handler, {
        ...route.responseOptions,
        detail: {
          tags: [this.basePath.replace('/', '')], // for swagger
        },
      })
    );
  }
}

export default BaseController;
