import { PartialType } from '@nestjs/mapped-types';
import { CreateCarreraDto } from './create-carrera.dto'; // ← ruta relativa dentro de dto

export class UpdateCarreraDto extends PartialType(CreateCarreraDto) {}