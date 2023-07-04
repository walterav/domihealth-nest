import { Module } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { ClinicHistoryController } from './clinic-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicHistory } from './entities/clinic-history.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ClinicHistoryController],
  providers: [ClinicHistoryService],
  imports: [
    TypeOrmModule.forFeature([ClinicHistory]),
    AuthModule,
  ],
  exports: [
    ClinicHistoryModule,
    TypeOrmModule,
  ]

})
export class ClinicHistoryModule {}
