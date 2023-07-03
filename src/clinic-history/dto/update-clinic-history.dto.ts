import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicHistoryDto } from './create-clinic-history.dto';

export class UpdateClinicHistoryDto extends PartialType(CreateClinicHistoryDto) {}
