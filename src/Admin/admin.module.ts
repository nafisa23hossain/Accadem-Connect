import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from 'src/Db/db.module';
import { MailModule } from 'src/Mail/mail.module';

@Module({
  imports: [DbModule, MailModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
