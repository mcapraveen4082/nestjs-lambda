/* eslint-disable */
import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import serverlessExpress from '@vendia/serverless-express';

let cachedHandler: Handler;

export const handler: Handler = async (event, context, callback) => {
  if (!cachedHandler) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedHandler = serverlessExpress({ app });
  }
  return cachedHandler(event, context, callback);
};
