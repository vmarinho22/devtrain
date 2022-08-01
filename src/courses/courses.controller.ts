import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('list')
  findAll() {
    return 'Listagem de cursos';
  }

  @Get('category/:category')
  findMany(@Param() params: any) {
    return `Vários cursos da category: ${params.category}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `Curso ${id}`;
  }
}
