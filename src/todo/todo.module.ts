import { Global, Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

@Global()
@Module({
  controllers: [TodoController]
})
export class TodoModule {}
