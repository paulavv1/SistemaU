import { IsString, IsEmail, IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateEstudianteDto {
  @IsString({ message: 'El nombre debe ser texto.' })
  @IsNotEmpty({ message: 'El nombre del estudiante es obligatorio.' })
  @MaxLength(100, { message: 'nombre must be shorter than or equal to 100 characters' })
  nombre: string;

  @IsEmail({}, { message: 'Debe ser un correo válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @IsInt({ message: 'El ID de la carrera debe ser un número.' })
  @IsNotEmpty({ message: 'El ID de la carrera es obligatorio.' })
  carreraId: number;

  @IsInt({ message: 'El ID del ciclo debe ser un número.' })
  cicloId?: number;
}
