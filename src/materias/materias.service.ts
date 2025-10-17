import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMateriaDto) {
    try {
      return await this.prisma.materia.create({ data });
    } catch (error) {
      console.error('Error al crear materia:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.materia.findMany({
        include: {
          carrera: true,
          docente: true,
          ciclo: true,
          inscripciones: true,
        },
      });
    } catch (error) {
      console.error('Error al obtener materias:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const materia = await this.prisma.materia.findUnique({
        where: { id },
        include: { carrera: true, docente: true, ciclo: true, inscripciones: true },
      });
      if (!materia) throw new NotFoundException(`Materia con id ${id} no encontrada`);
      return materia;
    } catch (error) {
      console.error(`Error al obtener materia con id ${id}:`, error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, data: UpdateMateriaDto) {
    try {
      await this.findOne(id); // verifica si existe
      return await this.prisma.materia.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Error al actualizar materia con id ${id}:`, error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id); // verifica si existe
      return await this.prisma.materia.delete({ where: { id } });
    } catch (error) {
      console.error(`Error al eliminar materia con id ${id}:`, error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
