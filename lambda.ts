import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import serverlessExpress from '@vendia/serverless-express';
import { TaskService } from './src/task.service';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  // Retrieve and start the task service after app initialization.
  // Change `.start()` to the actual method your service exposes (e.g., .run()).
  try {
    const taskService = app.get(TaskService);
    if (taskService && typeof taskService.runTask === 'function') {
      await taskService.runTask();
    }
  } catch (err) {
    // If TaskService isn't registered or path/method differs, remove or adjust this block.
    // It's safe to continue without the task service.
    console.warn('TaskService not started:', err);
  }

  return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
};
