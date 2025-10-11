import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsInt()
  especialidadId: number;
}
