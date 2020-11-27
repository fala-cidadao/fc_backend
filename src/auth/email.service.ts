import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}
    
    async sendMail(email: string, token: string): Promise<void> {
 
        await this.mailerService.sendMail({
                to: email,
                subject: 'Password recovery',
                text: `https://es-fc-frontend.netlify.app/recover-password/${token}`
        })

        Logger.log("Email successfully sent")
        
    }
}