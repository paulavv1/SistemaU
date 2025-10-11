import { IsInt } from 'class-validator';

export class CreateInscripcionDto {
  @IsInt()
  estudianteId: number;

  @IsInt()
  materiaId: number;
}
