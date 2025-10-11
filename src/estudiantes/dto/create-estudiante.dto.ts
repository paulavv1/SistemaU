import { IsNotEmpty, IsString, IsEmail, IsInt, Min, MaxLength } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del estudiante es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido del estudiante es obligatorio' })
  @MaxLength(100, { message: 'El apellido no puede superar los 100 caracteres' })
  apellido: string;

  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  email: string;

  @IsInt()
  @Min(16, { message: 'La edad mínima es 16 años' })
  edad: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del ciclo es obligatorio' })
  cicloId: number;
}
