import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.estudiantesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudiantesService.update(id, updateEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.remove(id);
  }
}
