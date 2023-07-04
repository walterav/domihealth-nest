import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { CreateClinicHistoryDto } from './dto/create-clinic-history.dto';
import { UpdateClinicHistoryDto } from './dto/update-clinic-history.dto';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('clinic-history')
export class ClinicHistoryController {
  constructor(private readonly clinicHistoryService: ClinicHistoryService) {}

  @Post()
  create(@Body() createClinicHistoryDto: CreateClinicHistoryDto) {
    return this.clinicHistoryService.create(createClinicHistoryDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto) {
    return this.clinicHistoryService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.clinicHistoryService.findOne( term );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateClinicHistoryDto: UpdateClinicHistoryDto
    ) {
    return this.clinicHistoryService.update( id , updateClinicHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clinicHistoryService.remove( id );
  }
}
