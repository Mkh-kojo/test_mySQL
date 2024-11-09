import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service'; // Importation du service
import { Todo } from './todo.entity'; // Importation de l'entité Todo

@Controller('todo')  // Le chemin pour accéder aux routes todo
export class TodoController {
  constructor(private readonly todoService: TodoService) {} // Injection du service

  // Route GET pour obtenir toutes les tâches
  @Get()
  async getTodos() {
    return this.todoService.findAll();  // Appel au service pour obtenir toutes les tâches
  }

  // Route POST pour ajouter une nouvelle tâche
  @Post()
  async addTodo(@Body() newTodo: { title: string }) {
    const todo = new Todo();  // Crée une nouvelle instance de Todo
    todo.title = newTodo.title;  // Affecte le titre
    todo.completed = false;  // Par défaut, la tâche est marquée comme non terminée
    
    return this.todoService.create(todo);  // Appel au service pour sauvegarder la tâche dans la base de données
  }

  // Route PATCH pour mettre à jour une tâche (par exemple, marquer une tâche comme terminée)
  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,  // Paramètre 'id' dans l'URL
    @Body() updateTodoDto: { title?: string, completed?: boolean },  // Corps de la requête
  ) {
    const updatedTodo = await this.todoService.update(Number(id), updateTodoDto);  // Appel au service pour mettre à jour la tâche
    return updatedTodo;  // Retourne la tâche mise à jour
  }

  // Route DELETE pour supprimer une tâche par son ID
  @Delete(':id')
  async removeTodo(@Param('id') id: string): Promise<{ message: string }> {
    await this.todoService.remove(Number(id));  // Appel au service pour supprimer la tâche
    return { message: 'Todo deleted successfully' };  // Message de succès
  }
}
