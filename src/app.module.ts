import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { Todo } from './todo/todo.entity';


@Module({
  imports: [
    // Configuration de TypeORM pour connecter à MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',             // Spécifie qu'on utilise MySQL
      host: 'localhost',         // L'hôte de la base de données
      port: 3306,                // Le port MySQL par défaut
      username: 'root',          // Ton nom d'utilisateur MySQL (par défaut root)
      password: 'Mkhitar2010!!', // Le mot de passe de ton utilisateur MySQL
      database: 'todo_app',      // Le nom de ta base de données
      entities: [Todo],          // Les entités associées (ici, `Todo`)
      synchronize: true,         // Active la synchronisation automatique avec la base de données
    }),
    TypeOrmModule.forFeature([Todo]), // Déclare l'entité `Todo` pour ce module
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
