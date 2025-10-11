import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(); // permite pasar opciones si lo necesitas en el futuro
  }

  async onModuleInit() {
    await this.$connect();
    console.log(' Prisma conectado a la base de datos');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(' Prisma desconectado de la base de datos');
  }
}
