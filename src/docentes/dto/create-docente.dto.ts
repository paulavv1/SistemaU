import { IsString, IsEmail, IsInt, MaxLength } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsEmail()
  email: string;

  @IsInt()
  especialidadId: number;
}
