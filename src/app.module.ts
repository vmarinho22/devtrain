import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CoursesModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
