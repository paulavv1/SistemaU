import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocenteDto } from './dto/create-docente.dto';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDocenteDto) {
    return this.prisma.docente.create({ data });
  }

  findAll(page = 1, limit = 10) {
    return this.prisma.docente.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    const docente = await this.prisma.docente.findUnique({ where: { id } });
    if (!docente) throw new NotFoundException('Docente no encontrado');
    return docente;
  }
}
