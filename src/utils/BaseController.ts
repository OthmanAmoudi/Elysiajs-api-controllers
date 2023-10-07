import { Elysia } from 'Elysia';

export interface Route {
  method: string;
  path: string;
  handler: (...args: any[]) => any;
  responseOptions?: Record<string, any>;
  middlewares?: any;
}

abstract class BaseController {
  app: any;
  basePath: string;
  abstract routes: Route[];
  // abstract middlewares: any[];

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

  convertEmptyPath(path: string) {
    switch (true) {
      case path.length === 1 && path === '/':
        return '';
      case path.startsWith(':'):
        return '/' + path;
      case path.startsWith('/') && path.length > 1:
        return path;
      default:
        return path;
    }
    // return path.length === 1 && path === '/' ? '' : path;
  }

  registerRoutes(routes: Route[]) {
    routes.forEach((route) =>
      this.app[route.method](
        `${this.basePath}${this.convertEmptyPath(route.path)}`,
        route.handler,
        {
          ...route.responseOptions,
          // ...this.middlewares,
          detail: {
            tags: [this.basePath.replace('/', '')], // for swagger
          },
        }
      )
    );
  }
}

export default BaseController;
