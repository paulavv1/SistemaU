import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { UpdateCicloDto } from './dto/update-ciclo.dto';

@Injectable()
export class CiclosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCicloDto) {
    return this.prisma.ciclo.create({ data });
  }

  async findAll(page = 1, limit = 10) {
    return this.prisma.ciclo.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    const ciclo = await this.prisma.ciclo.findUnique({ where: { id } });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado');
    return ciclo;
  }

  async update(id: number, data: UpdateCicloDto) {
    const ciclo = await this.prisma.ciclo.findUnique({ where: { id } });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado');
    return this.prisma.ciclo.update({ where: { id }, data });
  }

  async remove(id: number) {
    const ciclo = await this.prisma.ciclo.findUnique({ where: { id } });
    if (!ciclo) throw new NotFoundException('Ciclo no encontrado');
    return this.prisma.ciclo.delete({ where: { id } });
  }
}
