import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('json', { nullable: true })
  tags?: string[];

  @Column()
  price: number;
}
