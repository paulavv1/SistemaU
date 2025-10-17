import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMateriaDto {
  @IsString()
  nombre: string;

  @IsInt()
  creditos: number;

  @IsInt()
  carreraId: number;

  @IsInt()
  @IsOptional()
  docenteId?: number;

  @IsInt()
  @IsOptional()
  cicloId?: number;
}
