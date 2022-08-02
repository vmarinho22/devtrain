import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { CoursesService } from './courses.service';
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get('list')
  findAll(@Res() response) {
    return response.status(200).send('Lista completa dos cursos');
  }

  @Get('category/:category')
  findMany(@Param() params: any) {
    return `Vários cursos da category: ${params.category}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number | string) {
    return `Curso ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT) // OR 204
  create(@Body() body: any) {
    return {
      body
    };
  }

  @Patch(':id')
  update(@Param('id') id: number | string, @Body() body: any) {
    return {
      message: `Curso ${id} atualizado com sucesso!`,
      body
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number | string) {
    return `Curso ${id} deletado com sucesso`;
  }
}
