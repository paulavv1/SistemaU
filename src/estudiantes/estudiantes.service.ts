import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEstudianteDto) {
    return this.prisma.estudiante.create({ data });
  }

  findAll(page = 1, limit = 10) {
    return this.prisma.estudiante.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({ where: { id } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    return estudiante;
  }

  async update(id: number, data: UpdateEstudianteDto) {
    const estudiante = await this.prisma.estudiante.findUnique({ where: { id } });
    if (!estudiante) throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);

    return this.prisma.estudiante.update({ where: { id }, data });
  }

  async remove(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({ where: { id } });
    if (!estudiante) throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);

    return this.prisma.estudiante.delete({ where: { id } });
  }
}
