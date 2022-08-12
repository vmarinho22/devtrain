import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString({ each: true })
  readonly tags?: string[];

  @IsNumber()
  readonly price: number;
}
