import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMateriaDto {
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  creditos: number;

  @IsInt()
  carreraId: number;

  @IsOptional()
  @IsInt()
  docenteId?: number;

  @IsOptional()
  @IsInt()
  cicloId?: number;
}
