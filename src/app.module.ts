import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrerasController } from './carreras/carreras.controller';
import { CarrerasService } from './carreras/carreras.service';
import { EspecialidadesController } from './especialidades/especialidades.controller';
import { EspecialidadesService } from './especialidades/especialidades.service';
import { DocentesController } from './docentes/docentes.controller';
import { DocentesService } from './docentes/docentes.service';
import { CiclosController } from './ciclos/ciclos.controller';
import { CiclosService } from './ciclos/ciclos.service';
import { MateriasController } from './materias/materias.controller';
import { MateriasService } from './materias/materias.service';
import { EstudiantesController } from './estudiantes/estudiantes.controller';
import { EstudiantesService } from './estudiantes/estudiantes.service';
import { InscripcionesController } from './inscripciones/inscripciones.controller';
import { InscripcionesService } from './inscripciones/inscripciones.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { CarrerasModule } from './carreras/carreras.module';
import { CiclosModule } from './ciclos/ciclos.module';
import { DocentesModule } from './docentes/docentes.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';

@Module({
  imports: [CarrerasModule, CiclosModule, DocentesModule, EspecialidadesModule, EstudiantesModule],
  controllers: [AppController, CarrerasController, EspecialidadesController, DocentesController, CiclosController, MateriasController, EstudiantesController, InscripcionesController],
  providers: [AppService, CarrerasService, EspecialidadesService, DocentesService, CiclosService, MateriasService, EstudiantesService, InscripcionesService, PrismaService, PrismaClient],
})
export class AppModule {}
