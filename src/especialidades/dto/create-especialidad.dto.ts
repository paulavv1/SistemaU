import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEspecialidadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la especialidad es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre: string;

  @IsString()
  @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres' })
  descripcion?: string;
}
