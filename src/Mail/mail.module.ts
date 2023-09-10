import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'hw733029@gmail.com',
          pass: 'tiasqnrurjbohfor',
        },
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
