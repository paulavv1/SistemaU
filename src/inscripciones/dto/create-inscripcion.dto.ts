import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateInscripcionDto {
  @IsInt()
  @IsNotEmpty({ message: 'El ID del estudiante es obligatorio' })
  estudianteId: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID de la materia es obligatorio' })
  materiaId: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del ciclo es obligatorio' })
  cicloId: number;

  @IsDateString({}, { message: 'La fecha debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de inscripción es obligatoria' })
  fechaInscripcion: string;
}
