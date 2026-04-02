import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


/* Swagger setup */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Deutsch API')
    .setDescription('The Deutsch API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
