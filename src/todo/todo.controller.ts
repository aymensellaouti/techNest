import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {

  @Get()
  getTodos() {
    console.log('Récupérer la liste des todos');
    return 'Liste des TODOS';
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
