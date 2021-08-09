import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService
  ) {
  }
  async addedCvMail(payload) {
    await this.mailerService.sendMail({
      to: 'aymen.sellaouti@gmail.com',
      subject: 'A new Cv is added',
      template: './cv-sent',
      context: payload,
      attachments: [
        {
         filename: 'test1.txt',
         content: 'Bonjour j envoi un fichier en pièce jointe',
         contentType: 'text/plain'
        }
      ]
    });
  }
}
