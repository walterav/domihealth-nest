import { Module } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { ClinicHistoryController } from './clinic-history.controller';

@Module({
  controllers: [ClinicHistoryController],
  providers: [ClinicHistoryService]
})
export class ClinicHistoryModule {}
