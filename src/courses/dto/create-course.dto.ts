export class CreateCourseDto {
  readonly name: string;
  readonly description?: string;
  readonly tags?: string[];
  readonly price: number;
}
