import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCarreraDto) {
    return this.prisma.carrera.create({ data });
  }

  findAll(page = 1, limit = 10) {
    return this.prisma.carrera.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const carrera = await this.prisma.carrera.findUnique({ where: { id } });
    if (!carrera) throw new NotFoundException('Carrera no encontrada');
    return carrera;
  }

  async update(id: number, data: UpdateCarreraDto) {
    const carrera = await this.prisma.carrera.findUnique({ where: { id } });
    if (!carrera)
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);

    return this.prisma.carrera.update({ where: { id }, data });
  }

  async remove(id: number) {
    const carrera = await this.prisma.carrera.findUnique({ where: { id } });
    if (!carrera)
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);

    return this.prisma.carrera.delete({ where: { id } });
  }
}
