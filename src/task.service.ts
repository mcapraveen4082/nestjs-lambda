import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  async runTask(): Promise<string> {
    // Your logic here
    console.log('Task started...');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Task completed.');

    return 'Task Done Successfully';
  }
}
