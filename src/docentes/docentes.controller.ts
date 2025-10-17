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
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.create(createDocenteDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.docentesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ) {
    return this.docentesService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.remove(id);
  }
}
