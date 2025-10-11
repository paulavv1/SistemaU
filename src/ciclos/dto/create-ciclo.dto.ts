import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCicloDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
