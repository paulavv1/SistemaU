import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DocentesController],
  providers: [DocentesService, PrismaService],
})
export class DocentesModule {}
