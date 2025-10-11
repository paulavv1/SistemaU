import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

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
    });
  }

  async findOne(id: number) {
    const carrera = await this.prisma.carrera.findUnique({ where: { id } });
    if (!carrera) throw new NotFoundException('Carrera no encontrada');
    return carrera;
  }
}
