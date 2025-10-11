import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  // Crear docente
  async create(data: CreateDocenteDto) {
    return this.prisma.docente.create({ data });
  }

  // Listar con paginación
  async findAll(page = 1, limit = 10) {
    return this.prisma.docente.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { especialidad: true }, // muestra relación
    });
  }

  // Buscar por ID
  async findOne(id: number) {
    const docente = await this.prisma.docente.findUnique({
      where: { id },
      include: { especialidad: true },
    });
    if (!docente) throw new NotFoundException('Docente no encontrado');
    return docente;
  }

  // Actualizar docente
  async update(id: number, data: UpdateDocenteDto) {
    await this.findOne(id); // valida existencia
    return this.prisma.docente.update({
      where: { id },
      data,
    });
  }

  // Eliminar docente
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.docente.delete({ where: { id } });
  }
}
