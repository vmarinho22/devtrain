import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly courseRepository: Repository<Course>
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number | string) {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`Curso id: ${id} não encontrado.`);
    }

    return course;
  }

  create(createCourseDTO: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDTO);
    return this.courseRepository.save(course);
  }

  async update(id: number | string, updateCourseDTO: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDTO
    });

    if (!course) {
      throw new NotFoundException(`Curso id: ${id} não encontrado.`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number | string) {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`Curso id: ${id} não encontrado.`);
    }

    return this.courseRepository.remove(course);
  }
}
