import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('json', { nullable: true })
  tags?: string[];

  @Column()
  price: number;
}
