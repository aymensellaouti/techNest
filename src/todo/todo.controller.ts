import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = []
  }
  todos: Todo[];
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

  @Get()
  getTodos(
    @Query() mesQueryParams
  ) {
    console.log(mesQueryParams);
    return this.todos;
  }

  @Get('/:id')
  getTodoById(
    @Param('id') id
  ) {
    const todo = this.todos.find((actualTodo) => actualTodo.id === +id);
    if (todo)
      return todo;
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }

  @Post()
  addTodo(
    @Body() newTodo: Todo
  ) {
    if (this.todos.length) {
      newTodo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      newTodo.id = 1;
    }
    this.todos.push(newTodo);
    return newTodo;
  }

  @Delete()
  deleteTodo() {
    console.log('Supprimer un todo de la liste des todos');
    return 'Delete TODO';
  }

  @Put()
  modifierTodo() {
    console.log('Modifier l un des todos de la liste des todos');
    return 'Update TODO';
  }
}
