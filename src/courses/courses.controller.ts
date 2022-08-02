import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get('list')
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number | string) {
    return this.courseService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT) // OR 204
  create(@Body() body: CreateCourseDto) {
    return this.courseService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number | string, @Body() body: UpdateCourseDto) {
    return this.courseService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number | string) {
    return this.courseService.remove(id);
  }
}
