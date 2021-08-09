import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from '../../config/events';
import { Injectable } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class CvListener {
  constructor(
    private mailService: MailService
  ) {
  }
  @OnEvent(EVENTS.CV_ADD)
  async handleCvAdded(payload: any) {
    console.log("j ecoute sur l'ajout d un cv et j'envoi un email");
    console.log('payloa');
    try {
      await this.mailService.addedCvMail(payload);
    } catch (e) {
      console.log(e);
    }
  }
}


