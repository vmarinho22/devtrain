import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description?: string | null;

  @JoinTable()
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, {
    cascade: true
  })
  tags: Tag[];

  @Column()
  price: number;
}
