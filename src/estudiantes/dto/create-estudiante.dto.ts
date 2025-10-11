import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsInt()
  carreraId: number;

  @IsOptional()
  @IsInt()
  cicloId?: number;
}
