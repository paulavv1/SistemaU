import { IsNotEmpty, IsString, IsEmail, MaxLength, IsInt, IsOptional } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty({ message: 'El nombre del estudiante es obligatorio.' })
  @IsString({ message: 'nombre must be a string' })
  @MaxLength(100, { message: 'nombre must be shorter than or equal to 100 characters' })
  nombre: string;

  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsEmail({}, { message: 'Debe ser un correo válido.' })
  email: string;

  @IsNotEmpty({ message: 'El ID de la carrera es obligatorio.' })
  @IsInt({ message: 'El ID de la carrera debe ser un número.' })
  carreraId: number;

  @IsOptional()
  @IsInt({ message: 'El ID del ciclo debe ser un número.' })
  cicloId?: number;
}
