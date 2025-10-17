import { IsNotEmpty, IsOptional, IsString, IsEmail, MaxLength, IsInt } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del docente es obligatorio.' })
  @MaxLength(100)
  nombre: string;

  @IsEmail({}, { message: 'Debe ser un correo válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @IsInt({ message: 'El ID de la especialidad debe ser un número.' })
  especialidadId: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  fechaCreacion?: string; // Opcional, generalmente Prisma lo llena automáticamente
}
