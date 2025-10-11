import { IsNotEmpty, IsEmail, IsInt } from 'class-validator';

export class CreateDocenteDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsInt()
  especialidadId: number;
}
