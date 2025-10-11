import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEstudianteDto) {
    return this.prisma.estudiante.create({ data });
  }

  async findAll(page = 1, limit = 10) {
    return this.prisma.estudiante.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { carrera: true, ciclo: true }, // muestra relaciones
    });
  }

  async findOne(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id },
      include: { carrera: true, ciclo: true },
    });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    return estudiante;
  }

  async update(id: number, data: UpdateEstudianteDto) {
    await this.findOne(id); // valida existencia
    return this.prisma.estudiante.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.estudiante.delete({ where: { id } });
  }
}
