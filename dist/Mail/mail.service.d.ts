import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailService;
    constructor(mailService: MailerService);
    ForgetPassword(email: string): Promise<void>;
}
