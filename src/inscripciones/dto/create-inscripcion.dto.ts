import { IsInt, IsOptional } from 'class-validator';

export class CreateInscripcionDto {
  @IsInt({ message: 'El ID del estudiante debe ser un número' })
  estudianteId: number;

  @IsInt({ message: 'El ID de la materia debe ser un número' })
  materiaId: number;

  @IsOptional()
  @IsInt({ message: 'El ID del ciclo debe ser un número' })
  cicloId?: number;
}
