import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElementsModule } from './elements/elements.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './elements/entities/element.entity';
import { LevelsModule } from './levels/levels.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'deutschapp',
      entities: [Element],
      synchronize: true,
    }),

    ElementsModule,

    LevelsModule,

    TopicsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
