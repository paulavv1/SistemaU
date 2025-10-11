import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionesService {
  constructor(private prisma: PrismaService) {}

  // Crear inscripcion
  async create(data: CreateInscripcionDto) {
    // Verifica que estudiante y materia existan
    const estudiante = await this.prisma.estudiante.findUnique({ where: { id: data.estudianteId } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const materia = await this.prisma.materia.findUnique({ where: { id: data.materiaId } });
    if (!materia) throw new NotFoundException('Materia no encontrada');

    return this.prisma.inscripcion.create({ data });
  }

  // Listar inscripciones con paginación
  async findAll(page = 1, limit = 10) {
    return this.prisma.inscripcion.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        estudiante: true,
        materia: true,
      },
    });
  }

  // Buscar por ID
  async findOne(id: number) {
    const inscripcion = await this.prisma.inscripcion.findUnique({
      where: { id },
      include: { estudiante: true, materia: true },
    });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }

  // Actualizar inscripcion
  async update(id: number, data: UpdateInscripcionDto) {
    await this.findOne(id);
    return this.prisma.inscripcion.update({ where: { id }, data });
  }

  // Eliminar inscripcion
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.inscripcion.delete({ where: { id } });
  }
}
