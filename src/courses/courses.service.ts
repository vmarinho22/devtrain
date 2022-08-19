import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly courseRepository: Repository<Course>,

    @Inject('TAGS_REPOSITORY')
    private readonly tagsRepository: Repository<Tag>
  ) {}

  findAll() {
    return this.courseRepository.find({
      relations: ['tags']
    });
  }

  async findOne(id: number | string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags']
    });

    if (!course) {
      throw new NotFoundException(`Curso id: ${id} não encontrado.`);
    }

    return course;
  }

  async create(createCourseDTO: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name: string) => this.preloadTagByName(name))
    );

    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags
    });
    return this.courseRepository.save(course);
  }

  async update(id: number | string, updateCourseDTO: UpdateCourseDto) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name: string) => this.preloadTagByName(name))
      ));

    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDTO,
      tags
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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    return this.tagsRepository.create({ name });
  }
}
