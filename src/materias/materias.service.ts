import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMateriaDto) {
    return this.prisma.materia.create({ data });
  }

  findAll(page = 1, limit = 10) {
    return this.prisma.materia.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    const materia = await this.prisma.materia.findUnique({ where: { id } });
    if (!materia) throw new NotFoundException('Materia no encontrada');
    return materia;
  }

  async update(id: number, data: UpdateMateriaDto) {
    await this.findOne(id); // verificar existencia
    return this.prisma.materia.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // verificar existencia
    return this.prisma.materia.delete({ where: { id } });
  }
}
