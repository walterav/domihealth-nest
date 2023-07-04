import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateClinicHistoryDto } from './dto/create-clinic-history.dto';
import { UpdateClinicHistoryDto } from './dto/update-clinic-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicHistory } from './entities/clinic-history.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class ClinicHistoryService {
  
  private readonly logger = new Logger('ClinicHistoryService');

  constructor(
    @InjectRepository(ClinicHistory)
    private readonly clinicHistoryRepository:Repository<ClinicHistory>
  ){}

  async create(createClinicHistoryDto: CreateClinicHistoryDto) {
    try {
      
      const clinicHistory = this.clinicHistoryRepository.create(createClinicHistoryDto);
      await this.clinicHistoryRepository.save(clinicHistory);
      return clinicHistory;


    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
  
    const { limit = 10, offset =0} = paginationDto;
    
    return this.clinicHistoryRepository.find({
      take:limit,
      skip:offset,

    })
  
  }

  async findOne( term: string) {
    let clinicHistory: ClinicHistory

    if(isUUID(term)){
      clinicHistory = await this.clinicHistoryRepository.findOneBy({ id: term});
    
    }else{
      clinicHistory = await this.clinicHistoryRepository.findOneBy({ id: term});
    
      /*const queryBuilder = this.patientRepository.createQueryBuilder();
      patient = await queryBuilder
      .where('UPPER(title) =:title or slug =:slug', {
        title:term.toUpperCase(),
        slug:term.toLowerCase(),
      }).getOne();*/
    }

    if( !clinicHistory )
      throw new NotFoundException(`Historia clínica con id ${ term } no encontrada`);
    return clinicHistory;
    }

  async update(id: string, updateClinicHistoryDto: UpdateClinicHistoryDto) {
    
    const clinicHistory = await this.clinicHistoryRepository.preload({
      id: id,
      ...updateClinicHistoryDto
    });

    if( !clinicHistory ) throw new NotFoundException(`Historia clínica con id: ${ id } no encontrada`);
    
    try {
      
      await this.clinicHistoryRepository.save(clinicHistory);
      return clinicHistory;


    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const clinicHistory = await this.findOne( id );
    await this.clinicHistoryRepository.remove( clinicHistory);
  }

  
  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Error inesperado, verifique los registros del servidor');

  }
}
