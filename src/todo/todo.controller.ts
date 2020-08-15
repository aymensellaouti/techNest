import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res, ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';
import { findIndex } from 'rxjs/operators';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { isNumeric } from 'rxjs/internal-compatibility';
import { type } from 'os';
import { UpperAndFusionPipe } from '../pipes/upper-and-fusion.pipe';

@Controller('todo')
export class TodoController {
  constructor(
     private todoService: TodoService
  ) {}

  @Get('v2')
  getTodosV2(
    @Req() request: Request,
    @Res() response: Response
  ) {
    console.log('Récupérer la liste des todos');
    response.status(205);
    response.json({
      contenu :  `Je suis une réponse générée à partir de l'objet Response de express`
    })
  }

  // Récupérer la liste des Todos
  @Get()
  getTodos(
    @Query() mesQueryParams: GetPaginatedTodoDto
  ): Todo[] {
    console.log(mesQueryParams instanceof GetPaginatedTodoDto);
    return this.todoService.getTodos();
  }

  // Récupérer le Todo via son Id
  @Get('/:id')
  getTodoById(
    @Param('id', new ParseIntPipe(
      {
        errorHttpStatusCode: HttpStatus.NOT_FOUND
      }
    )) id
  ) {
    return this.todoService.getTodoById(id);
  }

  // Ajouter un Todo
  @Post()
  addTodo(
    @Body() newTodo: AddTodoDto
  ): Todo {
      console.log(newTodo);
      return this.todoService.addTodo(newTodo);
  }

  // Supprimer un Todo via son id
  @Delete(':id')
  deleteTodo(
    @Param('id', ParseIntPipe) id
  ) {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  modifierTodo(
    @Param('id', ParseIntPipe) id,
    @Body() newTodo: Partial<AddTodoDto>
  ) {
      return this.todoService.updateTodo(id, newTodo);
  }

  @Post('pipe')
  testPipe(
    @Param('data', UpperAndFusionPipe) paramData,
    @Body() data
  ) {
    return data;
  }
}
