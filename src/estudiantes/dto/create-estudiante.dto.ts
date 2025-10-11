import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsInt()
  carreraId: number;

  @IsOptional()
  @IsInt()
  cicloId?: number;
}
