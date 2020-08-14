import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {

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
  ) {
    console.log('Récupérer la liste des todos');
    return 'La liste des Todos';
  }

  @Post()
  addTodo() {
    console.log('Ajouter un Todo à la liste des todos');
    return 'Add TODO';
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
