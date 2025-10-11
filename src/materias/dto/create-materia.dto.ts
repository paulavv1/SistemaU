import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMateriaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsNotEmpty()
  creditos: number;

  @IsInt()
  @IsNotEmpty()
  carreraId: number;

  @IsInt()
  @IsOptional()
  docenteId?: number;

  @IsInt()
  @IsOptional()
  cicloId?: number;
}
