import { Controller, Get, Post, Body, Param, Query, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CiclosService } from './ciclos.service';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { UpdateCicloDto } from './dto/update-ciclo.dto';

@Controller('ciclos')
export class CiclosController {
  constructor(private readonly ciclosService: CiclosService) {}

  @Post()
  create(@Body() createCicloDto: CreateCicloDto) {
    return this.ciclosService.create(createCicloDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.ciclosService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ciclosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCicloDto: UpdateCicloDto) {
    return this.ciclosService.update(id, updateCicloDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ciclosService.remove(id);
  }
}
