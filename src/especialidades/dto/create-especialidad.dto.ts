import { IsString, IsOptional } from 'class-validator';

export class CreateEspecialidadDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
