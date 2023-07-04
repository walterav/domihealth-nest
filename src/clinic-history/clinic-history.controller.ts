import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { CreateClinicHistoryDto } from './dto/create-clinic-history.dto';
import { UpdateClinicHistoryDto } from './dto/update-clinic-history.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('clinic-history')
export class ClinicHistoryController {
  constructor(private readonly clinicHistoryService: ClinicHistoryService) {}

  @Post()
  @Auth( ValidRoles.user )
  create(
    @Body() createClinicHistoryDto: CreateClinicHistoryDto,
    @GetUser() user: User,
    ) {
    
      return this.clinicHistoryService.create(createClinicHistoryDto, user);
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
  @Auth( ValidRoles.user )
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateClinicHistoryDto: UpdateClinicHistoryDto,
    @GetUser() user: User,
    ) {
    return this.clinicHistoryService.update( id , updateClinicHistoryDto, user);
  }

  @Delete(':id')
  @Auth( ValidRoles.user )
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clinicHistoryService.remove( id );
  }
}
