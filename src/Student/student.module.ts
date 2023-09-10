import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { DbModule } from 'src/Db/db.module';
import { MailModule } from 'src/Mail/mail.module';

@Module({
  imports: [DbModule, MailModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
