import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMateriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  creditos: number;

  @IsNotEmpty()
  @IsInt()
  carreraId: number;

  @IsOptional()
  @IsInt()
  docenteId?: number;

  @IsOptional()
  @IsInt()
  cicloId?: number;
}
