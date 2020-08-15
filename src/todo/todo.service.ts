import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }
  addTodo(newTodo: AddTodoDto): Todo {
    const {name, description} = newTodo;
    let id;
    if (this.todos.length) {
       id = this.todos[this.todos.length - 1].id + 1;
    } else {
       id = 1;
    }

    const todo = {
      id,
      name,
      description,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }

  getTodoById(id: number): Todo {
    const todo = this.todos.find((actualTodo) => actualTodo.id === id);
    if (todo)
      return todo;
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }

  deleteTodo(id: number) {
    // Chercher l'objet via son id dans le tableau des todos
    const index = this.todos.findIndex((todo) => todo.id === +id);
    // Utiliser la méthode splice pour supprimer le todo s'il existe
    if (index >= 0 ) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    // Sinon je vais déclencher une erreur
    return {
      message : `Le todo d'id ${id} a été supprimé avec suucès`,
      count: 1
    };
  }

  updateTodo(id:number, newTodo: Partial<Todo>) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description? newTodo.description : todo.description;
    todo.name = newTodo.name? newTodo.name : todo.name;
    return todo;
  }
}
