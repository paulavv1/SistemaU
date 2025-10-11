import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateCicloDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;
}
