import chalk from 'chalk';

function requestLogger(ctx: any) {
  if (process.env.NODE_ENV === 'development') {
    let coloredMethod;
    switch (ctx.request.method) {
      case 'GET':
        coloredMethod = chalk.green(ctx.request.method);
        break;
      case 'DELETE':
        coloredMethod = chalk.red(ctx.request.method);
        break;
      default:
        coloredMethod = chalk.yellowBright(ctx.request.method);
        break;
    }
    console.info(
      coloredMethod,
      chalk.yellow('--'),
      ctx.request.url.replace(`http://localhost:${process.env.PORT}`, ''),
      chalk.yellow('--'),
      ctx.code
        ? chalk.bgRedBright(ctx.code)
        : ctx.set.status === 200
        ? chalk.bgGreen(ctx.set.status)
        : ctx.set.status === 300
        ? chalk.bgYellowBright(chalk.black(ctx.set.status))
        : chalk.bgRedBright(chalk.black(ctx.set.status)),
      new Date()
    );
  }
}

function bootLogger() {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      'running on',
      chalk.blueBright('http://localhost:') +
        chalk.greenBright(process.env.PORT)
    );
  }
}

const gracefulShutdown = async () => {
  console.log(chalk.yellowBright('shutting down gracefully (5 seconds) ....'));
  // disconnet DB and other services...
  setTimeout(() => {
    console.log('good bye');
    process.exit();
  }, 5000);
};
export { requestLogger, bootLogger, gracefulShutdown };
