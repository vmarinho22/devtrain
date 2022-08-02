import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Define que nenhum dado a mais será inserido
      forbidNonWhitelisted: true, // Barra a inserção de itens quando enviado items a mais
      transform: true // Transforma automaticamente o objeto das informações com o tipo do dto
    })
  );
  await app.listen(3000);
}
bootstrap();
