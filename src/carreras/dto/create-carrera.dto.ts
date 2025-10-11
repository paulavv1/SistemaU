import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCarreraDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
