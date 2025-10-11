import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCicloDto {
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
