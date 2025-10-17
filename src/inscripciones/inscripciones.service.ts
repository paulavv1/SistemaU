import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInscripcionDto) {
    try {
      return await this.prisma.inscripcion.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return this.prisma.inscripcion.findMany({
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
      include: { estudiante: true, materia: true, ciclo: true },
    });
    if (!inscripcion) throw new NotFoundException(`Inscripcion con ID ${id} no encontrada`);
    return inscripcion;
  }

  async update(id: number, data: UpdateInscripcionDto) {
    await this.findOne(id); // valida que exista
    return this.prisma.inscripcion.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // valida que exista
    return this.prisma.inscripcion.delete({ where: { id } });
  }
}
