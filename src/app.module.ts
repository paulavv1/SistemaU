import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrerasModule } from './carreras/carreras.module';
import { CiclosModule } from './ciclos/ciclos.module';
import { DocentesModule } from './docentes/docentes.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { MateriasModule } from './materias/materias.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    CarrerasModule,
    CiclosModule,
    DocentesModule,
    EspecialidadesModule,
    EstudiantesModule,
    InscripcionesModule,
    MateriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
