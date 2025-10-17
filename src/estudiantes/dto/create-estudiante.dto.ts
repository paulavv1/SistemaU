import { IsNotEmpty, IsString, MaxLength, IsEmail, IsInt, IsOptional } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del estudiante es obligatorio.' })
  @MaxLength(100)
  nombre: string;

  @IsEmail({}, { message: 'Debe ser un correo válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @IsInt({ message: 'El ID de la carrera debe ser un número.' })
  carreraId: number;

  @IsInt({ message: 'El ID del ciclo debe ser un número.' })
  @IsOptional()
  cicloId?: number;
}
