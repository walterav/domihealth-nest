import { Module } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { ClinicHistoryController } from './clinic-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicHistory } from './entities/clinic-history.entity';

@Module({
  controllers: [ClinicHistoryController],
  providers: [ClinicHistoryService],
  imports: [
    TypeOrmModule.forFeature([ClinicHistory])
  ]
})
export class ClinicHistoryModule {}
