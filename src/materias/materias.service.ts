import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  // Crear materia
  async create(data: CreateMateriaDto) {
    // Verificar que la carrera exista
    const carrera = await this.prisma.carrera.findUnique({ where: { id: data.carreraId } });
    if (!carrera) throw new NotFoundException('Carrera no encontrada');

    // Verificar docente si se proporciona
    if (data.docenteId) {
      const docente = await this.prisma.docente.findUnique({ where: { id: data.docenteId } });
      if (!docente) throw new NotFoundException('Docente no encontrado');
    }

    // Verificar ciclo si se proporciona
    if (data.cicloId) {
      const ciclo = await this.prisma.ciclo.findUnique({ where: { id: data.cicloId } });
      if (!ciclo) throw new NotFoundException('Ciclo no encontrado');
    }

    return this.prisma.materia.create({ data });
  }

  // Listar materias con paginación
  async findAll(page = 1, limit = 10) {
    return this.prisma.materia.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { carrera: true, docente: true, ciclo: true },
    });
  }

  // Buscar por ID
  async findOne(id: number) {
    const materia = await this.prisma.materia.findUnique({
      where: { id },
      include: { carrera: true, docente: true, ciclo: true },
    });
    if (!materia) throw new NotFoundException('Materia no encontrada');
    return materia;
  }

  // Actualizar materia
  async update(id: number, data: UpdateMateriaDto) {
    await this.findOne(id);

    if (data.carreraId) {
      const carrera = await this.prisma.carrera.findUnique({ where: { id: data.carreraId } });
      if (!carrera) throw new NotFoundException('Carrera no encontrada');
    }

    if (data.docenteId) {
      const docente = await this.prisma.docente.findUnique({ where: { id: data.docenteId } });
      if (!docente) throw new NotFoundException('Docente no encontrado');
    }

    if (data.cicloId) {
      const ciclo = await this.prisma.ciclo.findUnique({ where: { id: data.cicloId } });
      if (!ciclo) throw new NotFoundException('Ciclo no encontrado');
    }

    return this.prisma.materia.update({ where: { id }, data });
  }

  // Eliminar materia
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.materia.delete({ where: { id } });
  }
}
