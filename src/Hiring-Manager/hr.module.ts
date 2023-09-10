import { Module } from '@nestjs/common';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';
import { DbModule } from 'src/Db/db.module';
import { MailModule } from 'src/Mail/mail.module';

@Module({
  imports: [DbModule, MailModule],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
