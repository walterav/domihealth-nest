import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { CreateClinicHistoryDto } from './dto/create-clinic-history.dto';
import { UpdateClinicHistoryDto } from './dto/update-clinic-history.dto';

@Controller('clinic-history')
export class ClinicHistoryController {
  constructor(private readonly clinicHistoryService: ClinicHistoryService) {}

  @Post()
  create(@Body() createClinicHistoryDto: CreateClinicHistoryDto) {
    return this.clinicHistoryService.create(createClinicHistoryDto);
  }

  @Get()
  findAll() {
    return this.clinicHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicHistoryDto: UpdateClinicHistoryDto) {
    return this.clinicHistoryService.update(+id, updateClinicHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicHistoryService.remove(+id);
  }
}
