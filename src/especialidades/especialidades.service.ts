import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Injectable()
export class EspecialidadesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEspecialidadDto) {
    return this.prisma.especialidad.create({ data });
  }

  async findAll(page = 1, limit = 10) {
    return this.prisma.especialidad.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    const especialidad = await this.prisma.especialidad.findUnique({ where: { id } });
    if (!especialidad) throw new NotFoundException('Especialidad no encontrada');
    return especialidad;
  }

  async update(id: number, data: UpdateEspecialidadDto) {
    await this.findOne(id);
    return this.prisma.especialidad.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.especialidad.delete({ where: { id } });
  }
}
