import { Injectable } from '@nestjs/common';
import { CreateClinicHistoryDto } from './dto/create-clinic-history.dto';
import { UpdateClinicHistoryDto } from './dto/update-clinic-history.dto';

@Injectable()
export class ClinicHistoryService {
  create(createClinicHistoryDto: CreateClinicHistoryDto) {
    return 'This action adds a new clinicHistory';
  }

  findAll() {
    return `This action returns all clinicHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicHistory`;
  }

  update(id: number, updateClinicHistoryDto: UpdateClinicHistoryDto) {
    return `This action updates a #${id} clinicHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicHistory`;
  }
}
