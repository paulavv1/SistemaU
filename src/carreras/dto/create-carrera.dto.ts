import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la carrera es obligatorio.' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres.' })
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres.' })
  descripcion?: string;
}
