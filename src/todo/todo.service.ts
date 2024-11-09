import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // Récupère toutes les tâches
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  // Récupère une tâche par son ID
  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id });
  }

  // Crée une nouvelle tâche
  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  // Met à jour une tâche par son ID
  async update(id: number, updatedTodo: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, updatedTodo);
    return this.findOne(id);  // Retourne la tâche mise à jour
  }

  // Supprime une tâche par son ID
  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
