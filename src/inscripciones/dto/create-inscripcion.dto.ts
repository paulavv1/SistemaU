import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateInscripcionDto {
  @IsInt()
  @IsNotEmpty()
  estudianteId: number;

  @IsInt()
  @IsNotEmpty()
  materiaId: number;
}
