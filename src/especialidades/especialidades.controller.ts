import { Controller, Get, Post, Body, Param, Patch, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  create(@Body() createEspecialidadDto: CreateEspecialidadDto) {
    return this.especialidadesService.create(createEspecialidadDto);
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.especialidadesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEspecialidadDto: UpdateEspecialidadDto) {
    return this.especialidadesService.update(id, updateEspecialidadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadesService.remove(id);
  }
}
