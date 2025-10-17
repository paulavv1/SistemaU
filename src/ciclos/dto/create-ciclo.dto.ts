import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCicloDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del ciclo es obligatorio.' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres.' })
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres.' })
  descripcion?: string;
}
