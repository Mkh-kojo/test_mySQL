import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockReturnValue([]),
            create: jest.fn().mockReturnValue({ id: 1, title: 'Test Task', completed: false }),
            update: jest.fn().mockReturnValue({ id: 1, title: 'Updated Task', completed: true }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTodos', () => {
    it('should return an empty array', async () => {
      const result = await controller.getTodos();
      expect(result).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('should return the added todo', async () => {
      const newTodo = { title: 'Test Task' };
      const result = await controller.addTodo(newTodo);
      expect(result).toEqual({ id: 1, title: 'Test Task', completed: false });
    });
  });

  describe('updateTodo', () => {
    it('should return the updated todo', async () => {
      const updatedTodo = { title: 'Updated Task', completed: true };
      const result = await controller.updateTodo(1, updatedTodo);
      expect(result).toEqual({ id: 1, title: 'Updated Task', completed: true });
    });
  });

  describe('removeTodo', () => {
    it('should return void after deletion', async () => {
      await controller.removeTodo(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
