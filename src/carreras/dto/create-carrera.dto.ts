import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCarreraDto {
  @IsNotEmpty({ message: 'El nombre de la carrera es obligatorio.' })
  @IsString({ message: 'El nombre debe ser texto.' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres.' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto.' })
  @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres.' })
  descripcion?: string;
}
