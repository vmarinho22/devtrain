import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do framework Nest JS',
      description: 'Fundamentos do framework Nest JS',
      tags: ['nest', 'javascript', 'nestjs'],
      price: 90.0
    }
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number | string) {
    const course = this.courses.find(
      (course: Course) => course.id === Number(id)
    );

    if (!course) {
      throw new NotFoundException(`Curso id: ${id} não encontrado.`);
    }
  }

  create(createCourseDTO: any) {
    this.courses.push({
      id: this.courses.length + 1,
      ...createCourseDTO
    });
  }

  update(id: number | string, updateCourseDTO: any) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id)
    );

    this.courses[indexCourse] = {
      ...this.courses[indexCourse],
      ...updateCourseDTO
    };
  }

  remove(id: number | string) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id)
    );

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}
