import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateInscripcionDto) {
    return this.prisma.inscripcion.create({ data });
  }

  findAll(page = 1, limit = 10) {
    return this.prisma.inscripcion.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        estudiante: true,
        materia: true,
        ciclo: true,
      },
    });
  }

  async findOne(id: number) {
    const inscripcion = await this.prisma.inscripcion.findUnique({
      where: { id },
      include: {
        estudiante: true,
        materia: true,
        ciclo: true,
      },
    });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }

  async update(id: number, data: UpdateInscripcionDto) {
    const existe = await this.prisma.inscripcion.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Inscripción no encontrada');
    return this.prisma.inscripcion.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existe = await this.prisma.inscripcion.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Inscripción no encontrada');
    return this.prisma.inscripcion.delete({ where: { id } });
  }
}
