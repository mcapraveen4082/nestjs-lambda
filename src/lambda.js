import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TaskService } from './task.service';

let taskService;

async function bootstrap() {
  if (!taskService) {
    const app = await NestFactory.createApplicationContext(AppModule);
    taskService = app.get(TaskService);
  }
}

export const handler = async () => {
  await bootstrap();

  const result = await taskService.runTask();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: result,
    }),
  };
};
