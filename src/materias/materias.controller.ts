import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.materiasService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiasService.update(Number(id), updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiasService.remove(Number(id));
  }
}
