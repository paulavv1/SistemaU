import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEspecialidadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la especialidad es obligatorio.' })
  @MaxLength(100)
  nombre: string;
}
