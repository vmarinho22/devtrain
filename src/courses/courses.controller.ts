import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('list')
  findAll(@Res() response) {
    return response.status(200).send('Lista completa dos cursos');
  }

  @Get('category/:category')
  findMany(@Param() params: any) {
    return `Vários cursos da category: ${params.category}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `Curso ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT) // OR 204
  create(@Body() body: any) {
    return {
      body
    };
  }
}
