import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}
  async ForgetPassword(email: string) {
    await this.mailService.sendMail({
      to: 'sajidridowan7@gmail.com',
      subject: 'Student Forum',
      text: 'Hello User',
    });
  }
}
