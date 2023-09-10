import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { DbModule } from 'src/Db/db.module';
import { MailModule } from 'src/Mail/mail.module';

@Module({
  imports: [DbModule, MailModule],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
export class ModeratorModule {}
